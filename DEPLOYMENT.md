# Deployment Guide

## Prerequisites

Before deploying the Contact Tracing System, ensure you have:

- [ ] Node.js (>= 8.10.x) and npm (>= 5.6.0) installed
- [ ] Backend REST API server configured and running
- [ ] MySQL/MariaDB database server
- [ ] Web server (Apache/Nginx) for production deployment
- [ ] SSL certificate for HTTPS (recommended for production)
- [ ] Google Maps API key (with appropriate restrictions)

## Development Setup

### 1. Clone and Install

```bash
git clone <your-repository-url>
cd contact3
npm install
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```env
VUE_APP_API_URL=http://localhost/contactRest/
VUE_APP_BASE_URL=http://localhost:8080/
VUE_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
NODE_ENV=development
```

### 3. Update Main Configuration

Edit `src/main.js` to use environment variables:

```javascript
export const base_url = Vue.prototype.$base_url = process.env.VUE_APP_BASE_URL || 'http://localhost:8080/';
export const api_url = Vue.prototype.$api_url = process.env.VUE_APP_API_URL || 'http://localhost/contactRest/';

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: 'places',
  }
})
```

### 4. Database Setup

```bash
# Import the database schema
mysql -u username -p database_name < contact.sql

# Or create a new database and import
mysql -u username -p
CREATE DATABASE contact_tracing;
USE contact_tracing;
SOURCE contact.sql;
```

### 5. Start Development Server

```bash
npm run serve
```

Access the application at `http://localhost:8080`

## Production Deployment

### Option 1: Traditional Web Server (Apache/Nginx)

#### 1. Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

#### 2. Configure Production Environment

Create `.env.production`:

```env
VUE_APP_API_URL=https://your-domain.com/api/
VUE_APP_BASE_URL=https://your-domain.com/
VUE_APP_GOOGLE_MAPS_API_KEY=your_production_api_key
NODE_ENV=production
```

#### 3. Apache Configuration

Create a virtual host configuration:

```apache
<VirtualHost *:443>
    ServerName your-domain.com
    DocumentRoot /var/www/contact-tracing/dist

    <Directory /var/www/contact-tracing/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # Handle Vue Router
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem
</VirtualHost>
```

#### 4. Nginx Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    root /var/www/contact-tracing/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

### Option 2: Docker Deployment

#### 1. Create Dockerfile

```dockerfile
# Build stage
FROM node:12-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### 2. Create docker-compose.yml

```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - VUE_APP_API_URL=https://your-api-domain.com/
      - VUE_APP_BASE_URL=https://your-domain.com/
    restart: unless-stopped
```

#### 3. Deploy

```bash
docker-compose up -d
```

## Backend API Deployment

Ensure your backend API is deployed and accessible. The API should support:

- CORS configuration for your frontend domain
- HTTPS in production
- Proper authentication and authorization
- Rate limiting and security headers

## Database Configuration

### Production Database Setup

1. Create a dedicated database user:

```sql
CREATE USER 'contact_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON contact_tracing.* TO 'contact_user'@'localhost';
FLUSH PRIVILEGES;
```

2. Configure regular backups:

```bash
# Add to cron
0 2 * * * mysqldump -u contact_user -p contact_tracing > /backup/contact_$(date +\%Y\%m\%d).sql
```

## Security Checklist

- [ ] Enable HTTPS with valid SSL certificate
- [ ] Configure proper CORS headers on backend
- [ ] Restrict Google Maps API key by domain/IP
- [ ] Set secure session/cookie settings
- [ ] Enable rate limiting on API endpoints
- [ ] Regular security updates for dependencies
- [ ] Implement proper authentication/authorization
- [ ] Enable database encryption at rest
- [ ] Configure firewall rules
- [ ] Set up monitoring and logging

## Performance Optimization

### 1. Enable Caching

Add cache headers in your web server configuration:

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 2. CDN Configuration

Consider using a CDN for static assets:

```javascript
// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? 'https://cdn.your-domain.com/'
    : '/'
}
```

## Monitoring and Maintenance

### Application Monitoring

Set up monitoring for:
- Application uptime
- API response times
- Error rates
- User activity

### Log Management

Configure log rotation:

```bash
# /etc/logrotate.d/contact-tracing
/var/log/contact-tracing/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
}
```

## Backup Strategy

### 1. Database Backups

```bash
#!/bin/bash
# backup-db.sh
BACKUP_DIR="/backup/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u user -p password contact_tracing | gzip > $BACKUP_DIR/contact_$DATE.sql.gz
find $BACKUP_DIR -type f -mtime +30 -delete
```

### 2. Application Files

```bash
# Backup uploaded files and configurations
tar -czf /backup/files/contact_files_$(date +%Y%m%d).tar.gz /var/www/contact-tracing/uploads
```

## Troubleshooting

### Common Issues

1. **Build fails**: 
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Node version: `node --version`

2. **API connection issues**:
   - Verify CORS settings on backend
   - Check network/firewall rules
   - Verify API URL in environment variables

3. **404 errors on refresh**:
   - Ensure web server is configured for SPA routing
   - Check `.htaccess` or nginx configuration

## Updates and Maintenance

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Or use npm-check-updates
npx npm-check-updates -u
npm install
```

### Deploying Updates

```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build
npm run build

# Deploy (rsync to server)
rsync -avz --delete dist/ user@server:/var/www/contact-tracing/dist/

# Or restart Docker
docker-compose down && docker-compose up -d --build
```

## Support

For deployment issues:
1. Check application logs
2. Verify environment configuration
3. Test API connectivity
4. Review web server error logs
5. Check database connection

---

**Last Updated**: 2025-11-16
