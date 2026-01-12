const { app } = require('@azure/functions');

app.http('trackEvent', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('NFL Analytics - Track Event function triggered');

        try {
            let eventData;
            
            if (request.method === 'GET') {
                eventData = {
                    eventName: request.query.get('event') || 'PageView',
                    timestamp: new Date().toISOString(),
                    source: 'NFL Analytics App'
                };
            } else {
                const body = await request.text();
                eventData = body ? JSON.parse(body) : {};
                eventData.timestamp = new Date().toISOString();
            }

            context.log('Event tracked:', JSON.stringify(eventData));

            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    success: true,
                    message: 'Event tracked successfully',
                    data: eventData
                })
            };

        } catch (error) {
            context.log('Error tracking event:', error);
            
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    success: false,
                    error: error.message
                })
            };
        }
    }
});
