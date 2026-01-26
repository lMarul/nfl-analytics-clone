# PowerShell script to add Application Insights tracking to all team pages

# Get all team index.html files
$teamFiles = Get-ChildItem -Path "NFL_Mirror\www.nfl.com\teams\*\index.html" -File

Write-Host "Found $($teamFiles.Count) team files to update" -ForegroundColor Cyan

$successCount = 0
$errorCount = 0

# Read the tracking code from a separate file to avoid escaping issues
$trackingCodeTemplate = Get-Content -Path "tracking-code-template.html" -Raw

foreach ($file in $teamFiles) {
    try {
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        
        # Check if tracking code already exists
        if ($content -match 'Application Insights - Team Page Visit Tracking') {
            Write-Host "  Skipping $($file.Directory.Name) - tracking already exists" -ForegroundColor Yellow
            continue
        }
        
        # Find the insertion point (right after the </script> tag that contains window.marketoHostName)
        # We'll insert just before the OneTrust comment
        $marker = '  <!-- OneTrust Cookies Consent Notice start -->'
        
        if ($content -match [regex]::Escape($marker)) {
            # Insert tracking code before OneTrust
            $newContent = $content -replace [regex]::Escape($marker), "$trackingCodeTemplate`r`n  $marker"
            
            # Write the updated content back
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
            
            Write-Host "  Updated: $($file.Directory.Name)" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "  Could not find insertion point in: $($file.Directory.Name)" -ForegroundColor Red
            $errorCount++
        }
    } catch {
        Write-Host "  Error processing $($file.Directory.Name): $($_.Exception.Message)" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Successfully updated: $successCount files" -ForegroundColor Green
Write-Host "Errors: $errorCount files" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan
