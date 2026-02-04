#!/bin/bash
# Send report to Discord channel
# Usage: ./send_discord.sh <report_content>

DISCORD_CHANNEL_ID="1466281866163392533"
CONTENT="$1"

# Send using clawdbot message tool via sessions_send
# This will be called from daily_report.sh
echo "Sending report to channel #$DISCORD_CHANNEL_ID..."

# Save report for sending
echo "$CONTENT" > /tmp/vps-report-draft.txt
echo "Report saved to /tmp/vps-report-draft.txt"
echo "Use message tool to send to Discord channel $DISCORD_CHANNEL_ID"
