# Heartbeat Tasks

## ✅ VPS Trading Bot Monitoring - FULLY AUTOMATED

**Status:** Handled by cron jobs - no manual heartbeat needed.

**Cron Jobs:**
1. Bot Status Check: Every 12h (00:00, 12:00 GMT+7)
2. Daily Report: Daily at 8:00 AM GMT+7

**Location:** `~/clawd/skills/vps-monitor/`
**Discord Channel:** #dex-trading-vps (1466281866163392533)

**Manual Check (if needed):**
- Status: `cd ~/clawd/skills/vps-monitor && ./check_bot_status.sh`
- Report: `cd ~/clawd/skills/vps-monitor && ./daily_report.sh`

---

## 📋 Periodic Checks (Rotate Through These)

**When to check:** 2-4 times per day during heartbeats

### Check List
- [ ] **Emails** - Any urgent unread messages?
- [ ] **Calendar** - Upcoming events in next 24-48h?
- [ ] **Weather** - Relevant if going out?
- [ ] **Trading** - Any alerts from trading bots?
- [ ] **Etsy** - New sales or reviews?

### Track Checks
Track in `memory/heartbeat-state.json`:
```json
{
  "lastChecks": {
    "email": 1703275200,
    "calendar": 1703260800,
    "weather": null
  }
}
```

### When to Reach Out
- Important email arrived
- Calendar event coming up (<2h)
- Trading bot alerts or issues
- Something interesting found
- It's been >8h since said anything

### When to Stay Quiet (HEARTBEAT_OK)
- Late night (23:00-08:00) unless urgent
- Human is clearly busy
- Nothing new since last check
- Just checked <30 minutes ago

### Proactive Work (Do Without Asking)
- Read and organize memory files
- Check on projects (git status, etc.)
- Update documentation
- Commit and push changes
- Review and update MEMORY.md (every few days)
- Update WORKSPACE.md when adding skills/projects
