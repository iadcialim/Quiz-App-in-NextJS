#!/bin/bash

echo "🧪 Testing API locally with real database..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not set"
    echo "💡 Run: export DATABASE_URL='your-neon-connection-string'"
    exit 1
fi

echo "1️⃣ Starting local dev server..."
echo "   Run in another terminal: npm run dev"
echo "   Wait for server to start on http://localhost:3000"
echo ""

read -p "Press Enter when dev server is running..."

echo "2️⃣ Testing score submission..."
curl -X POST http://localhost:3000/api/scores \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "score": 85}'

echo ""
echo ""

echo "3️⃣ Checking database records..."
psql "$DATABASE_URL" -c "SELECT * FROM score_submissions ORDER BY created_at DESC LIMIT 5;"

echo ""
echo "✅ Test complete!"