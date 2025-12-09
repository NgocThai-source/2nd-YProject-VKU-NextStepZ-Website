#!/bin/bash

# NextStepZ - Portfolio Builder Setup & Run Scripts
# Cross-platform helper script

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎨 NextStepZ - Portfolio Builder${NC}\n"

case "$1" in
  "setup")
    echo "📦 Installing dependencies..."
    cd backend && npm install && cd ../frontend && npm install && cd ..
    echo -e "${GREEN}✓ Dependencies installed${NC}\n"
    
    echo "🗄️  Setting up database..."
    cd backend
    [ ! -f .env ] && cp .env.example .env
    echo "⚠️  Update DATABASE_URL in backend/.env, then press Enter"
    read
    npm run prisma:migrate:deploy
    echo -e "${GREEN}✓ Database ready${NC}\n"
    
    echo "🌱 Seeding demo data..."
    npm run prisma:seed 2>/dev/null || echo "⚠️  Seed skipped (optional)"
    echo -e "${GREEN}✓ Setup complete!${NC}\n"
    
    echo "Next steps:"
    echo "1. Start backend: cd backend && npm run start:dev"
    echo "2. Start frontend: cd frontend && npm run dev"
    ;;

  "backend:dev")
    echo "🔧 Starting backend development server..."
    cd backend && npm run start:dev
    ;;

  "frontend:dev")
    echo "🎨 Starting frontend development server..."
    cd frontend && npm run dev
    ;;

  "lint")
    echo "🔍 Running linters..."
    cd backend && npm run lint && cd ../frontend && npm run lint
    echo -e "${GREEN}✓ Linting complete${NC}"
    ;;

  "test")
    echo "🧪 Running tests..."
    cd backend && npm run test && cd ../frontend && npm run test
    echo -e "${GREEN}✓ Tests passed${NC}"
    ;;

  "build")
    echo "🏗️  Building project..."
    cd backend && npm run build && cd ../frontend && npm run build
    echo -e "${GREEN}✓ Build complete${NC}"
    ;;

  "clean")
    echo "🧹 Cleaning build artifacts..."
    rm -rf backend/dist backend/coverage
    rm -rf frontend/.next frontend/out
    echo -e "${GREEN}✓ Clean complete${NC}"
    ;;

  *)
    echo "Usage: ./scripts.sh [command]"
    echo ""
    echo "Commands:"
    echo "  setup              - Install dependencies & setup database"
    echo "  backend:dev        - Start backend development server"
    echo "  frontend:dev       - Start frontend development server"
    echo "  lint               - Run ESLint on both projects"
    echo "  test               - Run tests on both projects"
    echo "  build              - Build for production"
    echo "  clean              - Remove build artifacts"
    ;;
esac
