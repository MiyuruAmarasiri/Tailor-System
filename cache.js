// cache.js - Redis caching layer
const redis = require('redis');
const client = redis.createClient();

const cacheMiddleware = (duration = 60) => {
    return async (req, res, next) => {
        const key = `cache:${req.originalUrl}`;
        
        try {
            const cached = await client.get(key);
            if (cached) {
                return res.json(JSON.parse(cached));
            }
        } catch (err) {
            console.error('Cache error:', err);
        }
        
        res.sendResponse = res.json;
        res.json = (body) => {
            client.setex(key, duration, JSON.stringify(body));
            res.sendResponse(body);
        };
        
        next();
    };
};