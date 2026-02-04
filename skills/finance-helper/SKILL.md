# Finance Helper

**Purpose**: Add finance transactions directly to Supabase database (bypassing Nuxt app)

## Supabase Database Schema

**Tables:**
- `transactions` - All transactions (income/expense/transfer)
- `wallets` - Bank accounts, credit cards, e-wallets, etc.
- `budgets` - Monthly budget limits by category

**Transaction Fields:**
```typescript
{
  id: string
  description: string      // รายละเอียด
  amount: number           // จำนวนเงิน
  currency: string        // "THB" | "USD"
  type: string            // "income" | "expense" | "transfer"
  category: string         // หมวดหมู่
  category_id: string | null
  subcategory_id: string | null
  date: Date | string    // วันที่
  wallet_id: string | null
  notes: string | null    // โน้ต
  tags: string[] | null    // แท็ก
}
```

**Wallet Fields:**
```typescript
{
  id: string
  name: string              // ชื่อบัญชี
  type: string             // "bank" | "credit_card" | "e_wallet" | "cash" | "payoneer" | "other"
  currency: string         // "THB" | "USD"
  balance: number          // ยอดเหลือ
  color: string            // สี
  created_at: Date | string
}
```

## Usage

When user says they spent money:
1. Parse the transaction details
2. Add to Supabase `transactions` table
3. Update `wallets` table (if wallet_id provided)

## Script Files

- `add-transaction.js` - Add single transaction to Supabase
- `add-batch.js` - Add multiple transactions at once
- `parse-natural.js` - Parse natural language input

## Environment

**Supabase Client Setup** (from lifeflow-nuxt):
```javascript
import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types'

const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY

export const client = createClient<Database>(supabaseUrl, supabaseKey)
```

**Required Environment Variables:**
- `NUXT_PUBLIC_SUPABASE_URL`
- `NUXT_PUBLIC_SUPABASE_ANON_KEY`
