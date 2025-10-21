#!/bin/bash

echo "📊 Quick database check..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not set"
    exit 1
fi

echo "🔍 Current records in database:"
psql "$DATABASE_URL" -c "SELECT id, name, score, submitted_at FROM score_submissions ORDER BY submitted_at DESC LIMIT 10;"

echo ""
echo "📈 Total records:"
psql "$DATABASE_URL" -c "SELECT COUNT(*) as total_submissions FROM score_submissions;"