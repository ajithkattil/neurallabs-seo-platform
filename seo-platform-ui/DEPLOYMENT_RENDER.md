# Deployment Guide - Render

Deploy your React frontend to Render in 5 minutes.

## ✅ Prerequisites

- GitHub account with this repo pushed
- Render account (https://render.com - free)
- Your backend API URL ready

## 🚀 Step-by-Step

### 1. Connect GitHub to Render

1. Go to https://dashboard.render.com
2. Click "New +"
3. Select "Static Site"
4. Connect GitHub account
5. Select `seo-platform-ui` repository

### 2. Configure Build Settings

- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Root Directory**: `.` (or leave empty)

### 3. Set Environment Variables

In Render dashboard:
1. Go to "Environment" tab
2. Add variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

### 4. Deploy

Click "Create Static Site"

Render will:
1. Build your app (`npm run build`)
2. Deploy to their CDN
3. Give you a URL like `https://seo-platform-ui.onrender.com`

Takes ~2-3 minutes.

---

## 🔗 Connecting to Backend

Your frontend will be at:
```
https://seo-platform-ui.onrender.com
```

Your backend should be at:
```
https://your-backend-name.onrender.com
```

### Update Environment Variable

In Render dashboard → Environment:
```
VITE_API_URL=https://your-backend-name.onrender.com
```

Then redeploy (click "Manual Deploy").

---

## ⚙️ Troubleshooting

### Build Failed
Check logs:
1. Go to Deployment → Logs
2. Look for build errors
3. Common: Missing dependencies

**Fix**: Run locally first
```bash
npm install
npm run build
```

### API Calls Failing
1. Check `VITE_API_URL` in environment
2. Check backend is running
3. Check CORS headers on backend

### Still on Old Version
1. Render caches builds
2. Click "Clear Cache & Redeploy"

---

## 🔄 Automatic Deployments

Once deployed:
- Every push to `main` triggers rebuild
- Takes ~3-5 minutes
- Old version stays live until new one finishes

To disable auto-deploy: Settings → Autodeploy toggle

---

## 📊 Performance

Render's CDN:
- ~100-200ms response time (from US)
- 99.9% uptime
- Automatic HTTPS
- DDoS protection included

For better: Upgrade to paid plan (not needed for MVP)

---

## 💰 Cost

- **Free tier**: Up to 3 static sites
- **Usage**: Unlimited bandwidth/requests
- **Best for**: MVP/testing

---

## ✅ Checklist

- [ ] Code pushed to GitHub
- [ ] Render connected to repo
- [ ] Build command correct: `npm install && npm run build`
- [ ] Publish directory: `dist`
- [ ] API URL environment variable set
- [ ] Deploy button clicked
- [ ] Logs show "Build successful"
- [ ] Site loads at Render URL
- [ ] Login page appears
- [ ] API calls working

---

## 🎯 Next Steps

1. Deploy frontend (this guide)
2. Deploy backend to Render
3. Connect in environment variables
4. Test with real data
5. Invite beta customers

Done! You now have a production-ready UI.

---

**Estimated Time**: 5 minutes  
**Difficulty**: Easy  
**Cost**: Free
