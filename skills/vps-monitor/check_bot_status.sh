#!/bin/bash
# Check bot status on VPS
# Run every 12 hours via cron

VPS="root@188.166.227.8"
LOG_FILE="$HOME/clawd/vps-monitor-logs/bot-status-$(date +%Y%m%d).log"
mkdir -p "$HOME/clawd/vps-monitor-logs"

echo "=== Bot Status Check - $(date '+%Y-%m-%d %H:%M:%S') ===" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# Check each bot
BOT_COUNT=0
RUNNING_COUNT=0

ssh "$VPS" "
  echo '=== BOT STATUS ==='
  for bot in \
    'lighter-rust-rabby:lighter-rust-rabby.service' \
    'lighter-rust-nanox:lighter-rust-nanox.service' \
    'reya-grid:reya-grid-v2.1.service' \
    'aster-bnb-sol:aster-bnb-sol-grid.service' \
    'paradex-grid:paradex-grid.service' \
    'hyperliquid-sol:hyperliquid-sol.service' \
    'aster-rebalance:aster-rebalance.service' \
    'apex-grid:apex-grid-points.service' \
    'pacifica:pacifica-aster-bot.service'
  do
    name=\$(echo \$bot | cut -d: -f1)
    service=\$(echo \$bot | cut -d: -f2)
    status=\$(systemctl is-active \$service 2>/dev/null)

    if [ \"\$status\" = 'active' ]; then
      pid=\$(systemctl show -p MainPID \$service 2>/dev/null | cut -d= -f2)
      echo \"✅ \$name (PID: \$pid)\"
      ((RUNNING++))
    else
      echo \"❌ \$name (NOT RUNNING)\"
    fi
    ((TOTAL++))
  done
  echo ''
  echo \"Total: \$RUNNING/\$TOTAL bots running\"
" >> "$LOG_FILE" 2>&1

echo "" >> "$LOG_FILE"
echo "=== System Resources ===" >> "$LOG_FILE"
ssh "$VPS" "free -h | grep -E 'Mem|Swap'" >> "$LOG_FILE"
ssh "$VPS" "df -h / | tail -1" >> "$LOG_FILE"
ssh "$VPS" "uptime" >> "$LOG_FILE"

echo "" >> "$LOG_FILE"
echo "=== Recent Errors (Last 24h) ===" >> "$LOG_FILE"
ssh "$VPS" "
  find /root/bots -name '*.log' -mtime -1 -exec grep -iE 'error|exception|failed' {} \; 2>/dev/null | \
  tail -20 || echo 'No errors found'
" >> "$LOG_FILE"

echo "" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"

# Alert if bot count is wrong (should be 6 running)
RUNNING_BOTS=$(grep "Total:" "$LOG_FILE" | tail -1 | grep -oE '[0-9]+/' | cut -d/ -f1)
if [ "$RUNNING_BOTS" -lt 6 ]; then
  # Send alert to Discord (TODO: implement)
  echo "⚠️ ALERT: Only $RUNNING_BOTS bots running (expected 6)" >> "$LOG_FILE"
fi

echo "Status check completed. Log: $LOG_FILE"
