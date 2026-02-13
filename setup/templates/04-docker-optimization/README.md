# Challenge 4: Optimize the Build

## Scenario

This Express API has a working Dockerfile, but it's terribly inefficient.
Every code change triggers a full `npm install` rebuild because of poor layer ordering.

Here's what our CI looks like on every push:

```
[2024-01-15 09:14:22] Building Docker image...
Step 1/7 : FROM node:latest
Step 2/7 : WORKDIR /app
Step 3/7 : COPY . .
Step 4/7 : RUN npm install
 ---> Installing packages (this takes 2m 14s EVERY time)
Step 5/7 : RUN npm run build
Step 6/7 : EXPOSE 3000
Step 7/7 : CMD ["node", "dist/index.js"]

Total build time: 2m 47s
Image size: 1.12 GB
```

A one-line code change should NOT take nearly 3 minutes to build.

## Goals

Optimize the `Dockerfile` so that:
1. Code-only changes don't re-download dependencies (layer caching).
2. The final image is as small as possible.
3. The build is reproducible and secure.

## Problems to Find

There are at least **6 issues** with the current Dockerfile. Look for:
- Image tag choices
- Layer ordering
- Missing files (`.dockerignore`)
- Build architecture
- Dependency installation commands
- Security practices

## Hints

- `COPY package*.json` before `COPY . .` is key for layer caching.
- `npm ci` is more deterministic than `npm install`.
- Multi-stage builds can dramatically reduce final image size.
- Alpine-based images are much smaller.
- Should the app run as root?
