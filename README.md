# NFL Analytics Clone

A static web application that tracks user interactions with NFL team pages using Azure Application Insights. This project mirrors NFL team content and provides analytics on which teams users are clicking to view.

## 🚀 Live Demo

**Production Site:** https://happy-desert-0f8e47600.2.azurestaticapps.net/www.nfl.com/teams/

## 📊 Features

- **Team Click Tracking**: Monitor which NFL teams users are most interested in
- **Azure Application Insights Integration**: Real-time analytics and telemetry
- **32 NFL Teams**: Complete coverage of all NFC and AFC teams
- **Dual Action Tracking**: Tracks both "View Profile" and "View Full Site" actions
- **Automatic Event Flushing**: Ensures events are captured before page navigation

## 🏗️ Architecture

### Technology Stack

- **Frontend**: HTML/JavaScript (Static Site)
- **Hosting**: Azure Static Web Apps
- **Analytics**: Azure Application Insights
- **CI/CD**: GitHub Actions
- **Version Control**: Git/GitHub

### Project Structure

```
nfl-analytics-clone/
├── NFL_Mirror/
│   └── www.nfl.com/
│       └── teams/
│           └── index.html          # Main teams page with tracking
├── .github/
│   └── workflows/
│       └── azure-static-web-apps-*.yml  # Deployment workflow
├── TRACKING_IMPLEMENTATION_GUIDE.md
└── README.md
```

## 📈 Tracking Implementation

### How It Works

1. **SDK Initialization**: Application Insights JavaScript SDK (v2) loads on the teams page
2. **User Clicks Team**: Click event triggers `trackTeamClick()` function
3. **Event Logged**: Custom event "TeamViewed" sent to Application Insights
4. **Event Flushed**: `appInsights.flush()` ensures event is transmitted
5. **Navigation Delayed**: 300ms delay ensures event is sent before page change
6. **Data Collected**: Event appears in Azure Application Insights logs

### Tracked Events

**Event Name:** `TeamViewed`

**Properties:**
- `Team`: NFL team name (e.g., "Dallas Cowboys")
- `Action`: User action ("View Profile" or "View Full Site")

**Example Event:**
```javascript
{
  name: "TeamViewed",
  properties: {
    Team: "Dallas Cowboys",
    Action: "View Profile"
  }
}
```

### Current Implementation Status

- ✅ **Teams Tracked**: Dallas Cowboys (fully implemented)
- ⚠️ **Remaining**: 31 teams need the new tracking pattern applied

## 🔧 Setup Instructions

### Prerequisites

- Azure subscription
- GitHub account
- Node.js (for local development, optional)

### Azure Resources Required

1. **Azure Static Web App**
   - Resource: `happy-desert-0f8e47600`
   - Region: East Asia

2. **Azure Application Insights**
   - Resource: `nfl-analytics-insights`
   - Instrumentation Key: `2029ad3b-2466-4e01-8ed9-b5f9029cc8f6`

### Deployment

The project uses GitHub Actions for automatic deployment:

1. Push changes to the `main` branch
2. GitHub Actions workflow triggers automatically
3. Site deploys to Azure Static Web Apps
4. Changes are live within 2-3 minutes

### GitHub Secret Required

Add this secret to your GitHub repository:

**Name:** `AZURE_STATIC_WEB_APPS_API_TOKEN_HAPPY_DESERT_0F8E47600`  
**Value:** Get from Azure Portal → Static Web App → Manage deployment token

## 📊 Viewing Analytics

### Azure Portal

1. Navigate to **Application Insights** → `nfl-analytics-insights`
2. Go to **Logs** section
3. Run KQL query:

```kusto
customEvents
| where name == "TeamViewed"
| where timestamp > ago(1h)
| project timestamp, name, customDimensions.Team, customDimensions.Action
| order by timestamp desc
```

### Sample Queries

**Most Popular Teams (Last 24 Hours):**
```kusto
customEvents
| where name == "TeamViewed"
| where timestamp > ago(24h)
| summarize ClickCount = count() by tostring(customDimensions.Team)
| order by ClickCount desc
```

**Action Breakdown:**
```kusto
customEvents
| where name == "TeamViewed"
| where timestamp > ago(24h)
| summarize Count = count() by tostring(customDimensions.Action)
```

**Clicks by Hour:**
```kusto
customEvents
| where name == "TeamViewed"
| where timestamp > ago(24h)
| summarize Count = count() by bin(timestamp, 1h)
| render timechart
```

## 🧪 Testing

### Manual Testing

1. **Navigate to teams page:**
   ```
   https://happy-desert-0f8e47600.2.azurestaticapps.net/www.nfl.com/teams/
   ```

2. **Open Browser DevTools Console** (F12)

3. **Verify SDK loaded:**
   - Look for: `Application Insights initialized: true`
   - Look for: `trackTeamClick function defined: function`

4. **Click Dallas Cowboys button**
   - Console should show tracking messages
   - Check Azure Insights after 5 minutes

### Debug Mode

The implementation includes extensive console logging:
- SDK initialization status
- Function definition confirmation
- Event tracking progress
- Event flushing status
- Navigation timing

## 🔒 Security

- Application Insights connection string is public-facing (client-side tracking)
- No sensitive data is collected
- Only team selection and action type are tracked
- No personally identifiable information (PII) collected

## 🐛 Known Issues

1. **404 Errors**: Some mirrored assets return 404 (expected for static mirror)
2. **CORS Warnings**: External resources blocked (doesn't affect tracking)
3. **Service Worker Errors**: Origin mismatch (expected for mirrored site)

**These errors do NOT affect Application Insights tracking functionality.**

## 🚧 Future Improvements

- [ ] Apply tracking to all 31 remaining teams
- [ ] Add session tracking
- [ ] Track time spent on team pages
- [ ] Add user demographics (if available)
- [ ] Create Power BI dashboard for visualization
- [ ] Add A/B testing capabilities
- [ ] Implement conversion funnel tracking

## 📚 Documentation

- [TRACKING_IMPLEMENTATION_GUIDE.md](TRACKING_IMPLEMENTATION_GUIDE.md) - Detailed implementation guide
- [Azure Application Insights Docs](https://learn.microsoft.com/en-us/azure/azure-monitor/app/javascript)
- [Azure Static Web Apps Docs](https://learn.microsoft.com/en-us/azure/static-web-apps/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for educational purposes.

## 👥 Team

- **Developer**: Romeo Jr
- **Course**: Cloud Computing (CLDCOMP)
- **Institution**: 2nd Year 2nd Term

## 🎉 Acknowledgments

- Microsoft Azure for cloud infrastructure
- NFL for team content (mirrored for educational purposes)
- GitHub for version control and CI/CD

---

**Last Updated**: January 2026  
**Status**: ✅ Production - Tracking Active