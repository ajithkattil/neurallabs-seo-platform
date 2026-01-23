# SPRINT PLAN - Agency Workflow UI
## Weeks 1-4 Build Timeline

---

## 📋 WEEK 1: FOUNDATION (THIS WEEK)

**Goal**: Set up project, create all core components, get to "Hello World"

### ✅ COMPLETED
- [x] Project structure created
- [x] Vite + React configured
- [x] Tailwind CSS integrated
- [x] All 6 core pages built
- [x] Auth context implemented
- [x] API client with Axios
- [x] Components: Sidebar, Header, Layout
- [x] Routing with React Router
- [x] Styling system in place
- [x] Documentation written

### 📋 REMAINING
- [ ] Clone repo to your machine
- [ ] Run `npm install`
- [ ] Start dev server: `npm run dev`
- [ ] Verify Login page loads
- [ ] Verify all routes accessible (after login)

### ⏱️ Time Estimate
**0.5 day** - Just setup and verify everything works

---

## 🔌 WEEK 2: BACKEND INTEGRATION

**Goal**: Connect UI to your FastAPI backend

### Must Do First
1. **Create Auth Endpoints** (in your FastAPI backend)
   ```python
   POST /auth/login
   POST /auth/logout
   GET /auth/me
   ```

2. **Create Projects Endpoints**
   ```python
   GET /projects
   POST /projects
   GET /projects/{id}
   ```

3. **Test with Postman** - Make sure endpoints work

### Tasks (3-4 days)
- [ ] Implement backend auth endpoints
- [ ] Test backend with Postman/curl
- [ ] Update `src/api/config.js` endpoints (if different from current)
- [ ] Test login flow end-to-end
- [ ] Fix CORS issues if any
- [ ] Test projects list/create
- [ ] Handle error responses
- [ ] Add loading states UI

### 🎯 Definition of Done
```
✅ Can login with real credentials
✅ Can see dashboard with real data
✅ Can list projects from backend
✅ Can create new project
✅ Errors display properly
```

### ⏱️ Time Estimate
**3-4 days** if backend endpoints ready
**5-7 days** if you need to build backend first

---

## 📊 WEEK 3: INTEGRATIONS & POLISH

**Goal**: GSC/GA4 integration UI, refine interactions

### Backend Requirements
1. **Integrations Endpoints**
   ```python
   GET /integrations
   POST /integrations/{type}/connect  # OAuth redirect
   POST /integrations/{type}/disconnect
   ```

2. **Tasks Endpoints**
   ```python
   GET /tasks
   POST /tasks
   GET /tasks/{id}
   ```

### Tasks (5-6 days)
- [ ] Implement integrations list endpoint
- [ ] Build OAuth flow UI for GSC
- [ ] Build OAuth flow UI for GA4
- [ ] Add integration status indicators
- [ ] Implement tasks list/create
- [ ] Add real-time status updates (optional)
- [ ] Error handling for API failures
- [ ] Mobile responsiveness check
- [ ] Performance optimization

### 🎯 Definition of Done
```
✅ GSC integration connects
✅ GA4 integration connects
✅ Can create tasks
✅ Can view task status
✅ Mobile-friendly layout
```

### ⏱️ Time Estimate
**5-6 days**

---

## 🚀 WEEK 4: TESTING & LAUNCH

**Goal**: Final polish, testing, deployment

### Backend Requirements
All previous endpoints + stable

### Tasks (4-5 days)
- [ ] Test all user flows end-to-end
- [ ] Fix UI bugs/glitches
- [ ] Optimize performance
- [ ] Add helpful error messages
- [ ] Test on mobile/tablet
- [ ] Security review (auth, tokens, etc)
- [ ] Build production version: `npm run build`
- [ ] Deploy to Vercel/Render
- [ ] Test deployed version
- [ ] Create user documentation
- [ ] Soft launch with 1-2 beta customers

### 🎯 Definition of Done
```
✅ Zero critical bugs
✅ Deployed to production
✅ Users can complete core flow
✅ NPS from beta customers > 40
```

### ⏱️ Time Estimate
**4-5 days**

---

## 🎯 CRITICAL PATH (Blocking Order)

```
Week 1: Setup ✅
    ↓
Week 2: Auth + Projects (MUST COMPLETE)
    ↓
Week 3: Integrations + Tasks
    ↓
Week 4: Polish + Deploy
```

**Don't skip ahead** - each week depends on previous one.

---

## 📊 Daily Standup Questions

Each day ask:
1. **What did I ship yesterday?**
2. **What am I shipping today?**
3. **What's blocking me?**

If blocked > 2 hours: Ask for help immediately.

---

## ⚠️ Common Blockers & Solutions

### Blocker: Backend not ready
**Solution**: Mock responses in `src/api/client.js`
```javascript
// Temporarily return mock data
if (config.url === '/projects') {
  return Promise.resolve({
    data: [{ id: 1, name: 'Test' }]
  })
}
```

### Blocker: Unclear backend API
**Solution**: Start with documented Swagger/OpenAPI
```
https://your-backend.com/docs
```

### Blocker: Unclear UI requirements
**Solution**: Show designs to beta customers ASAP
Get feedback in Week 2, not Week 4.

### Blocker: Can't connect to backend
**Solution**:
1. Check `VITE_API_URL` environment
2. Check backend CORS headers
3. Check browser console for errors
4. Try with Postman first

---

## 📞 Who to Ask

**Backend Issues**: Your backend team  
**Frontend Issues**: AI assistance (me)  
**Design Issues**: Beta customers  
**Deployment Issues**: Render support  

---

## 🎁 Bonus Ideas (After MVP)

If you finish early:
- [ ] Dark mode toggle
- [ ] Keyboard shortcuts
- [ ] Drag-drop tasks
- [ ] Real-time updates with WebSockets
- [ ] Mobile app version
- [ ] Advanced filtering

But **DON'T** add these until MVP is done.

---

## 📈 Success Metrics

### Week 1
- Project setup complete ✅
- All pages load without errors

### Week 2
- Real login working
- Real projects visible
- No console errors

### Week 3
- Integrations connect
- Tasks create successfully
- Mobile-friendly

### Week 4
- Deployed to production
- 1-2 beta customers testing
- 0 critical bugs

---

## 🎯 By End of Week 4

You should have:
- ✅ Production-ready React UI
- ✅ Connected to your FastAPI backend
- ✅ Deployed to Vercel/Render
- ✅ 1-5 beta customers using it
- ✅ Ready for next phase (GSC/GA4 real data)

---

## 📚 Documentation to Create

As you build, document:
1. **API Endpoint Behavior** - What each returns
2. **UI Workflows** - Step-by-step for users
3. **Error Messages** - What causes them & solutions
4. **Common Issues** - FAQ for beta customers

---

## ✅ Checklist: End of Week 1

Before moving to Week 2:
- [ ] Project cloned & installed locally
- [ ] `npm run dev` works
- [ ] Login page loads
- [ ] Can navigate to all pages
- [ ] No console errors
- [ ] API client configured
- [ ] Ready to connect to backend

**If all checked**: Move to Week 2 ✅

---

**Status**: Week 1 DONE  
**Ready to Start**: Week 2  
**Expected Completion**: 4 weeks  
**Current Date**: January 21, 2026
