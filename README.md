# NFL Analytics with Azure Application Insights

This project uses the modern NPM method for Application Insights integration.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Application Insights Bundle
```bash
npm run build
```

This will create `dist/appInsights.bundle.js` which is included in the HTML.

### 3. Development Mode (Auto-rebuild on changes)
```bash
npm run dev
```

## Application Insights Configuration

The Application Insights configuration is in `appInsights.js`:

- **Connection String**: Pre-configured for your Azure resource in East Asia
- **Auto Route Tracking**: Enabled
- **CORS Correlation**: Enabled
- **Request/Response Header Tracking**: Enabled

## Usage

Once built, simply open `index.html` in a browser. The Application Insights SDK will:
- Automatically track page views
- Track user interactions
- Monitor performance
- Capture errors and exceptions

## Tracking Custom Events

Since `appInsights` is exposed globally via `window.appInsights`, you can track custom events anywhere in your code:

```javascript
// Track a custom event
appInsights.trackEvent({ name: 'ButtonClicked' });

// Track a metric
appInsights.trackMetric({ name: 'ResponseTime', average: 123 });

// Track an exception
appInsights.trackException({ exception: new Error('Something went wrong') });
```

## Benefits of NPM Method vs Inline Script

✅ **Type Safety**: TypeScript definitions included  
✅ **Better Performance**: Optimized bundle with tree-shaking  
✅ **No Script Errors**: Clean code without minification issues  
✅ **Easy Configuration**: Readable configuration in JavaScript  
✅ **Modern Development**: Uses standard NPM packages and build tools  

## Deployment

Make sure to commit the `dist/appInsights.bundle.js` file to your repository, or rebuild it as part of your deployment process.
