# NFL Team Click Tracking Implementation Guide

## Overview
This document describes the Application Insights tracking implementation for the NFL team links in the cloned NFL website.

## What Was Done

### 1. Added Application Insights SDK
Added the Application Insights JavaScript SDK to the `<head>` section of `/NFL_Mirror/www.nfl.com/teams/index.html` (around line 66-74).

```javascript
<!-- Application Insights -->
<script type="text/javascript">
  var sdkInstance="appInsightsSDK";window[sdkInstance]="appInsights";...
  {
    instrumentationKey:"YOUR_INSTRUMENTATION_KEY_HERE"
  }
  ...
</script>
```

**IMPORTANT:** Replace `YOUR_INSTRUMENTATION_KEY_HERE` with your actual Azure Application Insights Instrumentation Key.

### 2. Added onclick Tracking Events
Added `onclick` event handlers to team links to track when users click on team buttons.

#### Teams with Tracking Implemented:
1. ✅ **Arizona Cardinals** - Both "View Profile" and "View Full Site" buttons
2. ✅ **Atlanta Falcons** - Both "View Profile" and "View Full Site" buttons
3. ✅ **Carolina Panthers** - Both "View Profile" and "View Full Site" buttons
4. ✅ **Chicago Bears** - Both "View Profile" and "View Full Site" buttons
5. ✅ **Dallas Cowboys** - Both "View Profile" and "View Full Site" buttons
6. ✅ **Kansas City Chiefs** - Both "View Profile" and "View Full Site" buttons

### 3. Tracking Event Format
Each team link now has an onclick event in this format:

```html
<a href="team-name/index.html" 
   onclick="appInsights.trackEvent({name: 'TeamViewed', properties: {Team: 'Team Name', Action: 'View Profile'}});">
   View Profile
</a>

<a href="https://www.teamsite.com/" 
   onclick="appInsights.trackEvent({name: 'TeamViewed', properties: {Team: 'Team Name', Action: 'View Full Site'}});">
   View Full Site
</a>
```

## Remaining Teams to Implement

### NFC Teams (10 remaining):
- Detroit Lions
- Green Bay Packers
- Los Angeles Rams
- Minnesota Vikings
- New England Patriots (if NFC)
- New Orleans Saints
- New York Giants
- Philadelphia Eagles
- San Francisco 49ers
- Seattle Seahawks
- Tampa Bay Buccaneers
- Washington Commanders

### AFC Teams (16 remaining):
- Baltimore Ravens
- Buffalo Bills
- Cincinnati Bengals
- Cleveland Browns
- Denver Broncos
- Houston Texans
- Indianapolis Colts
- Jacksonville Jaguars
- Las Vegas Raiders
- Los Angeles Chargers
- Miami Dolphins
- New York Jets
- Pittsburgh Steelers
- Tennessee Titans

## How to Add Tracking to Remaining Teams

For each team, you need to add the `onclick` attribute to both buttons:

1. Find the team's section in the HTML file
2. Locate the two `<a>` tags (View Profile and View Full Site)
3. Add onclick attribute before the closing `>`:

**For "View Profile" button:**
```html
onclick="appInsights.trackEvent({name: 'TeamViewed', properties: {Team: '[TEAM NAME]', Action: 'View Profile'}});"
```

**For "View Full Site" button:**
```html
onclick="appInsights.trackEvent({name: 'TeamViewed', properties: {Team: '[TEAM NAME]', Action: 'View Full Site'}});"
```

## Example Implementation

### Before:
```html
<a href="detroit-lions/index.html" 
   class="d3-o-media-object__link d3-o-button nfl-o-cta nfl-o-cta--primary" 
   title="View Detroit Lions Profile" 
   target="_self"
   aria-label="View Detroit Lions Profile">
  View Profile
</a>
```

### After:
```html
<a href="detroit-lions/index.html" 
   class="d3-o-media-object__link d3-o-button nfl-o-cta nfl-o-cta--primary" 
   title="View Detroit Lions Profile" 
   target="_self"
   aria-label="View Detroit Lions Profile"
   onclick="appInsights.trackEvent({name: 'TeamViewed', properties: {Team: 'Detroit Lions', Action: 'View Profile'}});">
  View Profile
</a>
```

## Testing the Implementation

1. **Replace the Instrumentation Key:**
   - Open the `/NFL_Mirror/www.nfl.com/teams/index.html` file
   - Find line ~70 with `instrumentationKey:"YOUR_INSTRUMENTATION_KEY_HERE"`
   - Replace with your actual Azure Application Insights key

2. **Open the page in a browser:**
   - Navigate to the teams page
   - Open browser Developer Tools (F12)
   - Go to the Network tab

3. **Click on a team button:**
   - Click on any team's "View Profile" or "View Full Site" button
   - Check the Network tab for requests to Application Insights
   - Look for POST requests to `dc.services.visualstudio.com`

4. **Verify in Azure Portal:**
   - Go to your Application Insights resource in Azure
   - Navigate to "Events" under "Usage"
   - Look for "TeamViewed" events
   - Check the properties to see Team name and Action

## Data Collected

For each team click, the following data is tracked:

- **Event Name:** TeamViewed
- **Properties:**
  - **Team:** The full name of the NFL team (e.g., "Dallas Cowboys", "Kansas City Chiefs")
  - **Action:** Either "View Profile" or "View Full Site"

## File Location

**Modified File:** `C:\Users\Maru\Desktop\ACADS\2nd Year 2nd Term\CLDCOMP\NFL\nfl-analytics-clone\NFL_Mirror\www.nfl.com\teams\index.html`

## Notes

- The implementation is client-side and requires JavaScript to be enabled
- Events are sent asynchronously and won't block page navigation
- Make sure to replace the placeholder instrumentation key with your actual key
- The remaining 26 teams need to be updated with the same pattern
- Each team has 2 buttons, so 52 onclick events still need to be added
