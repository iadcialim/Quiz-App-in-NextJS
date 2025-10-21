#!/bin/bash

# Automated Deployment Script for Quiz App
echo "🚀 Starting automated deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel (requires manual authentication)
echo "🔐 Logging into Vercel..."
vercel login

# Deploy the application
echo "🌐 Deploying to Vercel..."
vercel --prod --yes

# Create Postgres database
echo "🗄️ Creating Postgres database..."
vercel postgres create quiz-app-db

# Deploy database schema
echo "📋 Deploying database schema..."
vercel postgres connect quiz-app-db -- psql < sql/schema.sql

echo "✅ Deployment complete!"
echo "🔗 Your app should be available at the URL provided by Vercel"

# Test the deployed API
echo "🧪 Testing deployed API..."
DEPLOYED_URL=$(vercel ls --scope=personal | grep quiz-app | awk '{print $2}' | head -1)
if [ ! -z "$DEPLOYED_URL" ]; then
    echo "Testing: https://$DEPLOYED_URL/api/scores"
    curl -X POST "https://$DEPLOYED_URL/api/scores" \
         -H "Content-Type: application/json" \
         -d '{"name":"test","score":100}'
else
    echo "⚠️ Could not determine deployed URL. Please test manually."
fi