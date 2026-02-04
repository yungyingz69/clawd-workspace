# VPS Trading Bot Monitor

**Purpose**: Monitor VPS trading bots and report performance to Discord

**VPS Details**:
- IP: 188.166.227.8
- User: root
- SSH Config: `~/.ssh/config` (host: `vps` or `digitalocean-vps`)
- Identity: `~/.ssh/id_rsa`

## Active Bots (9 total)

| Bot | Exchange | Service | Status |
|-----|----------|----------|:------:|
| lighter-rust-rabby | Lighter | lighter-rust-rabby.service | ⚠️ |
| lighter-rust-nanox | Lighter | lighter-rust-nanox.service | ⚠️ |
| reya-grid | Reya | reya-grid-v2.1.service | ⚠️ |
| aster-bnb-sol | Aster | aster-bnb-sol-grid.service | ✅ |
| paradex-grid | Paradex | paradex-grid.service | ✅ |
| hyperliquid-sol | Hyperliquid | hyperliquid-sol.service | ✅ |
| aster-rebalance | Aster | aster-rebalance.service | ✅ |
| apex-grid | Apex | apex-grid-points.service | ✅ |
| pacifica | Pacifica | pacifica-aster-bot.service | ✅ |

## Monitoring Tasks

### 1. Check Bot Status (Every 12 hours)
```bash
# Check all bots via systemd
ssh root@188.166.227.8 "
  systemctl list-units --type=service --state=active | \
  grep -E 'reya-grid|aster|paradex|hyperliquid|lighter|apex|grvt|pacifica' | \
  awk '{print \$1}'
"
```

### 2. Daily Performance Summary (8:00 AM GMT+7)

**Collect:**
1. Bot status (running/stopped)
2. System resources (CPU/Memory/Disk)
3. Recent errors from logs
4. Trade performance (if available in logs)

**Commands:**
```bash
# Bot status
ssh root@188.166.227.8 "
  for bot in \
    lighter-rust-rabby.service \
    lighter-rust-nanox.service \
    reya-grid-v2.1.service \
    aster-bnb-sol-grid.service \
    paradex-grid.service \
    hyperliquid-sol.service \
    aster-rebalance.service \
    apex-grid-points.service \
    pacifica-aster-bot.service
  do
    status=\$(systemctl is-active \$bot 2>/dev/null)
    echo \"\$bot: \$status\"
  done
"

# System resources
ssh root@188.166.227.8 "free -h && df -h / && uptime"

# Recent errors (last 50 lines)
ssh root@188.166.227.8 "
  find /root/bots -name '*.log' -mtime -1 -exec tail -20 {} \; | \
  grep -iE 'error|exception|failed' || echo 'No errors found'
"
```

### 3. Send Report to Discord

**Channel**: `#dex-trading-vps` (Channel ID: 1466281866163392533)

**Report Format (8:00 AM Daily):**
```
📊 DEX Trading VPS - Daily Report
📅 2026-01-29

🤖 Bot Status:
✅ Running: 6 bots
❌ Stopped: 3 bots

[Bot list with status]

💻 System Resources:
- Memory: 773Mi / 3.8Gi (20%)
- Disk: 19G / 25G (76%)
- Uptime: 91 days
- Load: 0.03

⚠️ Errors/Issues:
[Recent errors if any]

💰 Performance Summary:
[Profit/Loss if available]
```

## Alert Triggers

**Send immediate alert if:**
- Any bot crashes (status goes from active → inactive)
- Memory usage > 90%
- Disk usage > 90%
- Multiple errors in logs

## Cron Jobs

### Bot Status Check (Every 12 hours)
```cron
0 */12 * * * cd /Users/Yingz/clawd && /path/to/check_bot_status.sh
```

### Daily Summary (8:00 AM GMT+7)
```cron
0 8 * * * cd /Users/Yingz/clawd && /path/to/daily_report.sh
```

## File Locations

**Local Workspace**:
- Scripts: `~/clawd/skills/vps-monitor/`
- Logs: `~/clawd/vps-monitor-logs/`

**VPS**:
- Bot configs: `/root/bots/`
- Service files: `/etc/systemd/system/`
- Logs: `/root/bots/*/bot.log`
