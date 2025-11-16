# Contact Tracing System

A comprehensive contact tracing and visitor management system built with Vue.js and CoreUI. This application helps organizations track visitors, residents, and their health status for effective contact tracing and monitoring.

## Features

- **Visitor Management**: Track visitors with QR code scanning and logging
- **Resident Logs**: Monitor resident movements and health status
- **Contact Tracing**: Comprehensive contact tracing capabilities
- **Health Status Monitoring**: Track and manage health status of visitors and residents
- **Travel History**: Record and monitor travel history
- **Visiting Points Management**: Manage multiple visiting points/locations
- **Dashboard Analytics**: Role-based dashboards for different user types (Admin, Registrar, Dean, Instructor, Accountant, Visiting Point)
- **QR Code Integration**: QR code generation and scanning for quick check-in/check-out
- **User Management**: Multiple user roles with appropriate permissions
- **Student Management**: Student enrollment, scheduling, and grading
- **Course Management**: Course and curriculum management
- **Financial Reporting**: Account statements and collections reporting

## Technology Stack

- **Frontend**: Vue.js 2.6.11
- **UI Framework**: CoreUI 2.x, Bootstrap 4, Bootstrap-Vue
- **State Management**: Vuex
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **Charts**: Chart.js with vue-chartjs
- **QR Code**: vue-qrcode-reader, qrcode.vue
- **Maps**: vue2-google-maps
- **Icons**: Font Awesome, CoreUI Icons, Simple Line Icons

## Prerequisites

- Node.js (>= 8.10.x)
- npm (>= 5.6.0)
- Backend REST API server (PHP/Laravel or similar)
- MySQL/MariaDB database

## Installation

### Clone the repository

```bash
git clone <your-repository-url>
cd contact3
```

### Install dependencies

```bash
npm install
```

## Configuration

### 1. Environment Setup

Create a `.env` file in the root directory (see `.env.example` for reference):

```env
VUE_APP_API_URL=http://localhost/contactRest/
VUE_APP_BASE_URL=http://localhost:8080/
VUE_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 2. Configure API Endpoints

Update the API endpoints in `src/main.js`:

```javascript
// For production
export const base_url = Vue.prototype.$base_url = 'https://your-domain.com/contact/';
export const api_url = Vue.prototype.$api_url = 'https://your-domain.com/contactRest/';

// For development
export const base_url = Vue.prototype.$base_url = 'http://localhost:8080/';
export const api_url = Vue.prototype.$api_url = 'http://localhost/contactRest/';
```

### 3. Google Maps API Key

Update the Google Maps API key in `src/main.js`:

```javascript
Vue.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_GOOGLE_MAPS_API_KEY',
    libraries: 'places',
  }
})
```

## Database Setup

1. Import the database schema from `contact.sql`:

```bash
mysql -u your_username -p your_database_name < contact.sql
```

2. Configure your backend API to connect to this database

## Usage

### Development Server

```bash
# Serve with hot reload at localhost:8080
npm run serve
```

### Production Build

```bash
# Build for production with minification
npm run build
```

### Linting

```bash
# Run linter
npm run lint
```

### Testing

```bash
# Run unit tests
npm run test:unit

# Run e2e tests
npm run test:e2e
```

## Project Structure

```
contact3/
├── public/              # Static assets
│   ├── img/            # Images and logos
│   ├── jsQR.min.js     # QR code library
│   └── worker.js       # Service worker
├── src/                
│   ├── assets/         # Styles and SCSS
│   ├── components/     # Reusable components
│   ├── containers/     # Layout containers
│   ├── router/         # Vue Router configuration
│   ├── shared/         # Shared utilities and API
│   ├── store/          # Vuex store modules
│   ├── views/          # Application views
│   ├── App.vue         # Root component
│   └── main.js         # Application entry point
├── tests/              # Test files
├── .gitignore          
├── package.json        
└── vue.config.js       # Vue CLI configuration
```

## Backend API

This frontend application requires a REST API backend. The API endpoints are defined in `src/shared/api.js`.

Expected API structure:
- `/user/*` - User management endpoints
- `/school/*` - School/institution management
- `/curriculum/*` - Course and curriculum management
- `/contact_trace/*` - Contact tracing endpoints
- `/visitor/*` - Visitor management
- `/resident/*` - Resident management

## Security Notes

⚠️ **Important**: Before deploying to production:

1. **Remove sensitive data** from `contact.sql` (passwords, tokens)
2. **Update Google Maps API key** and restrict it properly
3. **Configure environment variables** for different environments
4. **Enable HTTPS** for production deployments
5. **Secure your backend API** with proper authentication
6. **Review user permissions** and access controls

## User Roles

The system supports multiple user roles:
- **Admin**: Full system access
- **Registrar**: Student and enrollment management
- **Dean**: Academic oversight and reporting
- **Instructor**: Course and grading management
- **Accountant**: Financial management and reporting
- **Visiting Point**: Visitor check-in/check-out management

## License

This project is based on CoreUI Free Vue Admin Template which is released under the MIT License.

## Acknowledgments

- Built with [CoreUI](https://coreui.io/) - Open Source Bootstrap Admin Template
- Original CoreUI Vue template by [Łukasz Holeczek](https://github.com/mrholek)

## Support

For issues and questions, please open an issue in the repository.

---

**Note**: This is a contact tracing and visitor management system. Please ensure compliance with local data privacy regulations when deploying and using this system.
