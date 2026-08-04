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
  "false positive"
  "flags.{0,20}vinted"
  "vinted.{0,20}flags"
  "forensic-grade"
  "is autonomous\b"
)
# Notes on omitted candidates (judgement call, see docs/audit):
# - Bare "vinted" is NOT banned: Vinted is a real marketplace named
#   legitimately throughout site copy (Signal/blog pages, llms.txt
#   disclaimer). Only the "we flag items on Vinted" integration-claim
#   shape is banned above.
# - Bare "200 milliseconds"/"under 50ms" are NOT banned: both figures
#   are used correctly in hedged form ("designed to complete within",
#   "in bench testing") across multiple pages. Banning the bare number
#   would block legitimate hedged copy, not just unhedged claims.

FOUND=0
for pattern in "${BANNED[@]}"; do
  matches=$(grep -rniE "$pattern" src/ public/ functions/ index.html --include="*.tsx" --include="*.ts" --include="*.html" --include="*.json" --include="*.txt" 2>/dev/null || true)
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
