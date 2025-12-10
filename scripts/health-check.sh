#!/bin/bash
set -e

echo "🔍 Running Health Check..."
echo ""

# Directory to scan
SRC_DIR="${1:-app}"

# =============================================================================
# 1. The Sin of Ignorance: eslint-disable & friends
# =============================================================================
echo "📋 Checking for ignore directives..."
if grep -rE "eslint-disable|@ts-ignore|@ts-nocheck|@ts-expect-error|biome-ignore" "$SRC_DIR" 2>/dev/null; then
  echo "❌ FOUND: Ignore directives. Please remove them."
  exit 1
fi
echo "✅ No ignore directives found."

# =============================================================================
# 2. The Sin of Silence: Empty Catches
# =============================================================================
echo ""
echo "📋 Checking for empty catch blocks..."
if grep -rE "catch\s*\([^)]*\)\s*\{\s*\}" "$SRC_DIR" 2>/dev/null; then
  echo "❌ FOUND: Empty catch blocks. Catches must handle errors."
  exit 1
fi
echo "✅ No empty catch blocks found."

# =============================================================================
# 3. The Sin of Uncertainty: any type
# =============================================================================
echo ""
echo "📋 Checking for 'any' type usage..."
if grep -rE ":\s*any\b|<any>|as\s+any" "$SRC_DIR" --include="*.ts" --include="*.tsx" 2>/dev/null; then
  echo "❌ FOUND: 'any' type usage. Use proper types instead."
  exit 1
fi
echo "✅ No 'any' type usage found."

# =============================================================================
# 4. The Sin of Mutability: let and var
# =============================================================================
echo ""
echo "📋 Checking for 'let' and 'var' declarations..."
if grep -rE "^\s*(let|var)\s+" "$SRC_DIR" --include="*.ts" --include="*.tsx" 2>/dev/null; then
  echo "❌ FOUND: Mutable declarations. Use const instead."
  exit 1
fi
echo "✅ No mutable declarations found."

# =============================================================================
# 5. The Sin of Debug Leaks: console.log
# =============================================================================
echo ""
echo "📋 Checking for console statements..."
if grep -rE "console\.(log|warn|error|info|debug)" "$SRC_DIR" --include="*.ts" --include="*.tsx" 2>/dev/null; then
  echo "❌ FOUND: Console statements. Use proper logging instead."
  exit 1
fi
echo "✅ No console statements found."

# =============================================================================
# 6. The Sin of Gluttony: Large Files (>100 lines)
# =============================================================================
echo ""
echo "📋 Checking for large files (>100 lines)..."
LIMIT=100
LARGE_FILES=$(find "$SRC_DIR" -name "*.ts" -o -name "*.tsx" 2>/dev/null | xargs wc -l 2>/dev/null | awk -v limit=$LIMIT '$1 > limit && $2 != "total" {print $2 ": " $1 " lines"}')

if [ -n "$LARGE_FILES" ]; then
  echo ""
  echo "⚠️  WARNING: The following files exceed $LIMIT lines:"
  echo "$LARGE_FILES"
  echo ""
  echo "❌ STRICT MODE: Exiting due to large files."
  exit 1
fi
echo "✅ No large files found."

# =============================================================================
# 7. The Sin of Untested Code: Functions without test suites
# =============================================================================
echo ""
echo "📋 Checking for files without test suites..."

UNTESTED_FILES=""
GAME_DIR="game"

if [ -d "$GAME_DIR" ]; then
  # Find all .ts files in game/ that export functions (excluding test files and types)
  for file in $(find "$GAME_DIR" -name "*.ts" ! -path "*/__tests__/*" ! -name "*.test.ts" 2>/dev/null); do
    # Check if file exports functions (has 'export const' or 'export function')
    if grep -qE "^export (const|function)" "$file" 2>/dev/null; then
      # Get the directory and filename
      dir=$(dirname "$file")
      basename=$(basename "$file" .ts)
      
      # Expected test file location
      test_file="$dir/__tests__/$basename.test.ts"
      
      # Check if test file exists
      if [ ! -f "$test_file" ]; then
        UNTESTED_FILES="$UNTESTED_FILES$file\n"
      fi
    fi
  done
fi

if [ -n "$UNTESTED_FILES" ]; then
  echo ""
  echo "⚠️  WARNING: The following files have functions but no test suite:"
  echo -e "$UNTESTED_FILES"
  echo "Expected: <dir>/__tests__/<filename>.test.ts"
  echo ""
  echo "❌ STRICT MODE: Exiting due to untested files."
  exit 1
fi
echo "✅ All function files have test suites."

# =============================================================================
# Success!
# =============================================================================
echo ""
echo "🎉 No sins found! Code is pure."
exit 0
