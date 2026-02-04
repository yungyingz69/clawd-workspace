#!/bin/bash
# OpenClaw Workspace Nightly Sync Script
# Syncs workspace to GitHub every night at midnight

cd ~/clawd

# Log file
LOG_FILE="$HOME/clawd/sync.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "=== Nightly Sync Started at $DATE ===" >> "$LOG_FILE"

# Add all changes
git add . >> "$LOG_FILE" 2>&1

# Check if there are changes
if git diff --cached --quiet; then
    echo "No changes to commit. Skipping." >> "$LOG_FILE"
else
    # Commit with timestamp
    git commit -m "Nightly sync: $DATE" >> "$LOG_FILE" 2>&1
    
    # Push to GitHub
    git push >> "$LOG_FILE" 2>&1
    
    echo "✅ Sync completed successfully" >> "$LOG_FILE"
fi

echo "=== Nightly Sync Ended ===" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"
