const { app } = require('@azure/functions');

app.http('healthCheck', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Health check requested');

        return {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                status: 'healthy',
                service: 'NFL Analytics API',
                timestamp: new Date().toISOString(),
                version: '1.0.0',
                functions: ['hello', 'trackEvent', 'healthCheck']
            })
        };
    }
});
