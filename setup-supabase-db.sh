#!/bin/bash

# Supabase Database Setup (Alternative)
echo "🚀 Setting up Supabase database..."

# Create Supabase project via API
SUPABASE_API="https://api.supabase.com/v1"

# Create new project
curl -X POST "$SUPABASE_API/projects" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "quiz-app-db",
    "organization_id": "your-org-id",
    "plan": "free",
    "region": "us-east-1"
  }'

echo "✅ Supabase project created"
echo "📍 Visit: https://app.supabase.com/projects"