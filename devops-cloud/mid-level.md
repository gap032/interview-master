# DevOps & Cloud - Mid-Level Questions

## 1. Docker Containerization

**Question**: Explain Docker and write a Dockerfile for a web application.

**Answer**:

**Dockerfile Example:**
```dockerfile
# Multi-stage build for smaller image
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
WORKDIR /app

# Non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Set ownership
RUN chown -R nodejs:nodejs /app

USER nodejs
EXPOSE 3000

CMD ["node", "server.js"]
```

**Best Practices:**
- Use multi-stage builds
- Minimize layers
- Run as non-root user
- Use .dockerignore
- Pin base image versions

**Docker Compose:**
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db
  
  db:
    image: postgres:14-alpine
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

---

## 2. CI/CD Pipeline

**Question**: Design a CI/CD pipeline for a web application.

**Answer**:

**Pipeline Stages:**
```
Code Push → Build → Test → Security Scan → Deploy to Staging → Deploy to Production
```

**GitHub Actions Example:**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Build Docker image
        run: docker build -t myapp:${{ github.sha }} .
      
      - name: Push to registry
        run: docker push myapp:${{ github.sha }}
  
  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to staging
        run: kubectl set image deployment/myapp myapp=myapp:${{ github.sha }}
  
  deploy-production:
    needs: deploy-staging
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          kubectl set image deployment/myapp myapp=myapp:${{ github.sha }}
```

---

## 3. Kubernetes Basics

**Question**: Explain Kubernetes core concepts and write a deployment manifest.

**Answer**:

**Core Concepts:**
- **Pod**: Smallest deployable unit (1+ containers)
- **Deployment**: Manages replica sets
- **Service**: Exposes pods to network
- **ConfigMap/Secret**: Configuration management

**Deployment Manifest:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: myapp:1.0
        ports:
        - containerPort: 3000
        env:
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: db_host
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```
