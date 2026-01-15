import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
    config: {
        connectionString: 'InstrumentationKey=e6b73e30-4ad9-44ae-81b5-70642d19935a;IngestionEndpoint=https://eastasia-0.in.applicationinsights.azure.com/;LiveEndpoint=https://eastasia.livediagnostics.monitor.azure.com/;ApplicationId=5008bece-9d47-49f3-8d6b-e8eb539f18fd',
        enableAutoRouteTracking: true, // Automatically track page route changes
        enableRequestHeaderTracking: true,
        enableResponseHeaderTracking: true,
        enableCorsCorrelation: true,
        enableDebug: false,
        loggingLevelConsole: 0
    }
});

appInsights.loadAppInsights();
appInsights.trackPageView(); // Manually track the first page view

// Export for use in other parts of your app
window.appInsights = appInsights;

export default appInsights;
