# GitHub Upload Checklist

## ✅ Pre-Upload Tasks Completed

### Documentation
- [x] Updated README.md with project-specific information
- [x] Created DEPLOYMENT.md with deployment instructions
- [x] Created SECURITY_REVIEW.md with security checklist
- [x] Created .env.example template
- [x] Updated package.json metadata

### Configuration
- [x] Updated .gitignore with appropriate exclusions
- [x] Created GitHub Actions CI workflow
- [x] CONTRIBUTING.md exists (from CoreUI template)

## ⚠️ CRITICAL: Actions Required Before Push

### 1. Sensitive Data Review

#### Google Maps API Key
**Location**: `src/main.js` (line ~51)
```javascript
// Current (INSECURE):
key: 'AIzaSyAcGJpLqoEVMELpopLT_BWeBT87imbwaVs',

// Change to:
key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
```

**Action**: Update `src/main.js` to use environment variable

#### Database File
**Location**: `contact.sql`
- Contains user passwords (hashed)
- Contains token fields
- Contains potentially sensitive data

**Options**:
1. Remove this file entirely (recommended)
2. Sanitize to only include schema
3. Add to .gitignore

**Action**: Choose an option and implement

### 2. Update API Configuration

**Location**: `src/main.js` (lines ~25-38)

Replace hardcoded values with environment variables:

```javascript
// Replace:
export const base_url = Vue.prototype.$base_url = 'http://localhost:8080/';
export const api_url = Vue.prototype.$api_url = 'http://localhost/contactRest/';

// With:
export const base_url = Vue.prototype.$base_url = process.env.VUE_APP_BASE_URL || 'http://localhost:8080/';
export const api_url = Vue.prototype.$api_url = process.env.VUE_APP_API_URL || 'http://localhost/contactRest/';
```

### 3. Create Local .env File

```bash
cp .env.example .env
```

Then edit `.env` with your actual values (DO NOT commit this file)

### 4. Review Image Files

Check these files for sensitive/proprietary content:
- [ ] `public/img/bg.jpg`
- [ ] `public/img/contact-logo.jpg`
- [ ] `public/img/contact-logo.png`
- [ ] `public/img/dcit-logo.png`
- [ ] `public/img/dcit-symbol.png`
- [ ] `public/img/id.png`
- [ ] `public/img/location.jpg`
- [ ] `public/img/profile.jpg`

## 📝 Optional But Recommended

### Update package.json
- [ ] Update author name
- [ ] Update homepage URL
- [ ] Update repository URL

**Location**: `package.json`
```json
{
  "name": "contact-tracing-system",
  "author": "Your Name",
  "homepage": "https://github.com/yourusername/contact-tracing-system",
  "repository": {
    "type": "git",
    "url": "git@github.com:yourusername/contact-tracing-system.git"
  }
}
```

### Create Additional Files
- [ ] Create LICENSE file (if not using CoreUI's MIT)
- [ ] Create CODE_OF_CONDUCT.md
- [ ] Create issue templates in `.github/ISSUE_TEMPLATE/`
- [ ] Create pull request template

### GitHub Repository Settings
- [ ] Add repository description
- [ ] Add topics/tags
- [ ] Enable Issues
- [ ] Enable Discussions (optional)
- [ ] Set up branch protection rules
- [ ] Configure GitHub Secrets for CI/CD
  - `GOOGLE_MAPS_API_KEY` (for GitHub Actions)

## 🚀 Git Commands to Upload

Once all above items are addressed:

```bash
# Check current status
git status

# Stage all changes
git add .

# Commit (review what's being committed first!)
git commit -m "Initial commit: Contact Tracing System"

# If this is a new repo, set the remote
git remote add origin https://github.com/yourusername/contact-tracing-system.git

# Push to GitHub
git push -u origin master
# or if your default branch is 'main':
git push -u origin main
```

## 🔒 Post-Upload Security

After uploading to GitHub:

1. **GitHub Secrets**: Add these to repository secrets:
   - `GOOGLE_MAPS_API_KEY`
   - Any other API keys used in CI/CD

2. **Google Maps API Key**: 
   - Restrict the key to your domain
   - Enable only required APIs
   - Set usage quotas

3. **Review Public Access**:
   - Ensure repository visibility is correct
   - Check no sensitive files were accidentally pushed
   - Review commit history for sensitive data

4. **Monitor**:
   - Set up Dependabot for security updates
   - Enable security advisories
   - Review access permissions

## 🆘 If You Accidentally Pushed Sensitive Data

1. **DO NOT** just delete the file and commit again (it's still in history)
2. Use git filter-branch or BFG Repo-Cleaner to remove from history
3. Rotate any exposed credentials immediately
4. Force push the cleaned history

```bash
# Remove file from all history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch contact.sql" \
  --prune-empty --tag-name-filter cat -- --all

# Force push
git push origin --force --all
```

## ✅ Final Verification

Before considering the upload complete:

- [ ] Clone the repository fresh and verify it builds
- [ ] Check all documentation links work
- [ ] Verify .env.example is present but .env is not
- [ ] Confirm no sensitive data is visible in repo
- [ ] Test CI/CD pipeline runs successfully
- [ ] Review README renders correctly on GitHub

---

## Quick Command Reference

```bash
# Review what will be committed
git diff --staged

# Check for large files
git ls-files | xargs ls -lh | sort -k5 -h -r | head -20

# Check for potential secrets
git grep -i 'password\|secret\|key\|token' -- ':!*.md' ':!package-lock.json'

# Amend last commit if you forgot something
git add forgotten-file
git commit --amend --no-edit
```

---

**Last Updated**: 2025-11-16

**Status**: Ready for upload after addressing critical items above
