#!/bin/bash

# Automated Database Setup Script
# Uses Neon (serverless PostgreSQL) for instant setup

echo "🚀 Setting up automated database..."

# Check if curl is available
if ! command -v curl &> /dev/null; then
    echo "❌ curl is required but not installed"
    exit 1
fi

# Create Neon database via API
echo "📦 Creating Neon PostgreSQL database..."

# Neon API endpoint for database creation
NEON_API="https://console.neon.tech/api/v2"

# Create project (database)
PROJECT_RESPONSE=$(curl -s -X POST "$NEON_API/projects" \
  -H "Content-Type: application/json" \
  -d '{
    "project": {
      "name": "quiz-app-db",
      "region_id": "aws-us-east-1"
    }
  }')

echo "✅ Database creation initiated"
echo "📋 Response: $PROJECT_RESPONSE"

# Extract connection string from response
# Note: This requires jq for JSON parsing or manual extraction
echo "🔗 Connection string will be available in Neon dashboard"
echo "📍 Visit: https://console.neon.tech/app/projects"

echo "🎯 Next steps:"
echo "1. Get connection string from Neon dashboard"
echo "2. Add to Vercel environment variables"
echo "3. Deploy schema with: ./deploy-schema.sh"