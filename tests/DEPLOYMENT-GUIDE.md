# Deployment Guide - Enhanced Scoring System

## Task: T036 Deploy enhanced scoring system to production environment

## Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# For production deployment
vercel --prod
```

### Option 2: Netlify
```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Login and deploy
netlify login
netlify deploy --prod --dir=.next
```

### Option 3: GitHub Pages
```bash
# Add to package.json scripts:
"export": "next export",
"deploy": "npm run build && npm run export && gh-pages -d out"

# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

## Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All tests pass: `npm run test:all`
- [ ] No console errors in production build
- [ ] Environment variables configured (if any)
- [ ] Build completes successfully: `npm run build`

### ✅ Enhanced Scoring Features
- [ ] Quiz scoring formula implemented (accuracy + speed)
- [ ] Egg game scoring with updated weights (100/10/10)
- [ ] Three-section Results layout (Quiz/Egg/Points)
- [ ] Score submission uses combined total
- [ ] Debug logging removed from production

### ✅ Performance
- [ ] Scoring calculations under 100ms
- [ ] Images optimized
- [ ] Bundle size acceptable
- [ ] No memory leaks in egg game

## Deployment Steps for AI Agent

### Step 1: Prepare for Deployment
```bash
# Remove debug console logs
# Update any hardcoded URLs
# Verify all dependencies are in package.json
npm run build
```

### Step 2: Deploy to Vercel
```bash
vercel --prod
```

### Step 3: Verify Deployment
- [ ] Application loads without errors
- [ ] Quiz completion works end-to-end
- [ ] Enhanced scoring displays correctly
- [ ] Egg juggling game functions properly
- [ ] Score submission to leaderboard works
- [ ] Mobile responsiveness maintained

### Step 4: Test Enhanced Scoring Online
1. **Complete a quiz** with mixed correct/wrong answers
2. **Play egg juggling game** during quiz
3. **Verify Results page** shows three sections:
   - Quiz Results (quiz-only metrics)
   - Egg Juggling (egg game metrics) 
   - Points (combined totals)
4. **Submit score** and verify correct total saved
5. **Check leaderboard** for submitted score

## Expected Live URL Structure
```
https://quiz-app-[project-name].vercel.app/
├── / (home page with subject selection)
├── /quiz/[subject] (enhanced quiz with scoring)
└── /results (enhanced results with three sections)
```

## Post-Deployment Validation

### Functional Tests
- [ ] Subject selection works
- [ ] Quiz timer functions correctly
- [ ] Egg juggling game responsive to touch/click
- [ ] Scoring calculations accurate
- [ ] Results display properly formatted
- [ ] Score submission successful

### Performance Tests
- [ ] Page load times acceptable
- [ ] Egg game runs smoothly (60fps)
- [ ] No JavaScript errors in console
- [ ] Mobile performance satisfactory

## Rollback Plan
If deployment issues occur:
1. Revert to previous Vercel deployment
2. Fix issues locally
3. Re-run test suite
4. Re-deploy with fixes

## Success Criteria
✅ **Application deployed successfully**  
✅ **Enhanced scoring system functional online**  
✅ **All three Results sections display correctly**  
✅ **Score calculations match specifications**  
✅ **No critical errors in production**  
✅ **Mobile and desktop compatibility maintained**

---

**Task Status**: [ ] T036 Deploy enhanced scoring system to production environment