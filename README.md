# Rate Limiting Demo

A small demo project that illustrates a simple token-bucket rate limiter using Redis. The primary goal is learning how rate limiting works and how to integrate a token-bucket limiter in a Node.js app.

## What this project contains

- `index.html` - simple frontend UI to request a piece of "wisdom".
- `script.js` - frontend JS that calls the server endpoint.
- `index.js` - (server entry) expected to expose `/wisdom` endpoint. (open in editor)
- `rateLimiting.js` - token-bucket logic that stores buckets in Redis and enforces limits.
- `redisClient.js` - Redis client and connection helper.
- `style.css` - frontend styles.

## Goal

Use the repo to learn: how token-bucket rate limiting works, how to persist client buckets in Redis, and how to integrate limits into a Node.js endpoint.

## Requirements

- Node.js (v14+ recommended)
- Redis running locally on `localhost:6379`

## Quick setup

1. Install dependencies (from project root):

```
npm install
```

2. Start Redis (platform-specific). On Windows you might run Redis in WSL or use a Docker container:

```
docker run -p 6379:6379 redis
```

3. Start the Node server (example):

```
node index.js
```

4. Open `index.html` in the browser (or visit the server's static route if served).

## How to use

- Click the "Generate" button in the UI to call the `/wisdom` endpoint.
- If allowed by the limiter you'll get a wisdom message; otherwise the call is declined.

## Rate limiting details (token-bucket)

- Capacity (`max_capacity`) is set to 10 tokens. Each token represents one allowed request.
- Refill rate (`refile_rate`) is 0.5 tokens per second (i.e., 1 token every 2 seconds).
- For each request, the server fetches the client's bucket from Redis (keyed by IP), computes tokens to add based on time elapsed, and if at least 1 token is available it consumes one and allows the request.
- Buckets are stored in Redis as JSON with `token` and `last_refile`. An expiry (EX) is used so unused buckets expire automatically.

This behavior is implemented in `rateLimiting.js`.

## Example: testing with curl

```
curl http://localhost:3000/wisdom
```

If the response JSON contains `success: false` and a decline message, the request was rate-limited.

## Customization

- Change `max_capacity` and `refile_rate` in `rateLimiting.js` to experiment with different limits.
- Adjust the Redis expiry (`EX`) to control how long inactive buckets persist.

## Troubleshooting

- If requests always fail: ensure Redis is running and `redisClient.connect()` succeeds.
- If buckets never refill: check system clock and that `last_refile` is correctly updated.
