# Security Review Checklist

## ⚠️ IMPORTANT: Review Before Pushing to GitHub

### 1. API Keys and Credentials
- [ ] Remove or replace Google Maps API key in `src/main.js` with environment variable
- [ ] Ensure no hardcoded passwords or tokens in any files
- [ ] Review `contact.sql` for sensitive data

### 2. Database File (contact.sql)
⚠️ **WARNING**: The `contact.sql` file contains:
- User table with password hashes
- Token fields
- Potentially sensitive user information

**Recommendation**: 
- Consider removing this file from the repository
- Or sanitize it to only include schema without actual user data
- Add instructions for users to set up their own database

### 3. API Configuration
The following files contain API endpoint configurations:
- `src/main.js` - Contains API URLs and Google Maps key
- `src/shared/api.js` - Contains API endpoint definitions

**Action Required**:
Update `src/main.js` to use environment variables instead of hardcoded values.

### 4. Environment Variables
- [ ] Create `.env` file locally (do NOT commit it)
- [ ] Ensure `.env` is in `.gitignore`
- [ ] Provide `.env.example` for others

### 5. Image Files
The following images are included:
- `public/img/bg.jpg`
- `public/img/contact-logo.jpg`
- `public/img/contact-logo.png`
- `public/img/dcit-logo.png`
- `public/img/dcit-symbol.png`
- `public/img/id.png`
- `public/img/location.jpg`
- `public/img/profile.jpg`

**Review**: Ensure these images don't contain sensitive or proprietary information.

### 6. Recommended Actions

#### High Priority:
1. **Update `src/main.js`** to use environment variables:
```javascript
export const base_url = Vue.prototype.$base_url = process.env.VUE_APP_BASE_URL || 'http://localhost:8080/';
export const api_url = Vue.prototype.$api_url = process.env.VUE_APP_API_URL || 'http://localhost/contactRest/';

// Google Maps
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: 'places',
  }
})
```

2. **Sanitize or remove `contact.sql`**:
   - Option A: Remove actual user data, keep only schema
   - Option B: Add to `.gitignore`
   - Option C: Create a separate `schema.sql` with just the structure

3. **Create production configuration guide**

#### Medium Priority:
4. Review and update license information
5. Add CONTRIBUTING.md guidelines
6. Add SECURITY.md for reporting vulnerabilities

#### Low Priority:
7. Add GitHub issue templates
8. Add pull request templates
9. Set up GitHub Actions for CI/CD

## Files to Review Manually:
- `contact.sql` - Contains user data and passwords
- `src/main.js` - Contains API keys
- All image files in `public/img/`
- Any configuration files with URLs or credentials

## Next Steps:
1. Review this checklist
2. Make necessary changes
3. Test the application with environment variables
4. Remove or sanitize sensitive files
5. Commit and push to GitHub

---
**Last Updated**: 2025-11-16
