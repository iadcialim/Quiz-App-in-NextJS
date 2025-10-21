#!/bin/bash

# Deploy Database Schema Script
echo "📊 Deploying database schema..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable not set"
    echo "💡 Set it with: export DATABASE_URL='your-connection-string'"
    exit 1
fi

# Check if psql is available
if ! command -v psql &> /dev/null; then
    echo "❌ psql is required but not installed"
    echo "💡 Install with: brew install postgresql (macOS)"
    exit 1
fi

# Deploy schema
echo "🔧 Executing schema.sql..."
psql "$DATABASE_URL" < sql/schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Schema deployed successfully"
    echo "🎯 Database ready for API testing"
else
    echo "❌ Schema deployment failed"
    exit 1
fi