#!/bin/bash
# Hard-fail deploy gate. Blocks the build if banned unhedged claim strings
# are present anywhere in source. Add to this list any claim that gets
# fixed and must never silently return.
set -e

BANNED=(
  "0\.3%"
  "TIR flags"
  "flags them"
  "fully autonomous"
  "court.admissible"
  "police approved"
  "legally immutable"
  "blockchain backed"
  "permanently unresellable"
  "eliminates resale value"
)

FOUND=0
for pattern in "${BANNED[@]}"; do
  matches=$(grep -rniE "$pattern" src/ index.html --include="*.tsx" --include="*.ts" --include="*.html" 2>/dev/null || true)
  if [ -n "$matches" ]; then
    echo "BLOCKED: banned claim pattern '$pattern' found:"
    echo "$matches"
    echo ""
    FOUND=1
  fi
done

if [ "$FOUND" -eq 1 ]; then
  echo "Deploy gate failed. Remove the banned claim(s) above before building."
  exit 1
fi

echo "Claim safety gate passed."
