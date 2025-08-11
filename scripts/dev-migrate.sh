#!/bin/bash

# Load environment variables and run migration
source .env.local
export DATABASE_URL
export POSTGRES_URL
export POSTGRES_PRISMA_URL

npm run db:migrate