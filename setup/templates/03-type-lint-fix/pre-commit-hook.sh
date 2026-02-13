#!/bin/sh
echo "Running type check and linting..."
npm run check
if [ $? -ne 0 ]; then
  echo ""
  echo "=========================================="
  echo "  COMMIT BLOCKED: Fix all errors first!  "
  echo "=========================================="
  echo ""
  exit 1
fi
echo "All checks passed!"
