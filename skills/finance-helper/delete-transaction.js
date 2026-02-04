#!/usr/bin/env node
/**
 * Delete Transaction from Supabase
 * Usage: node delete-transaction.js <transaction_id>
 * Example: node delete-transaction.js 123e4567-e89b-12d3-a456-426614174000
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Get Supabase credentials from nuxt.config.ts
const nuxtConfigPath = resolve(process.env.HOME, 'Documents/Claude Code/Productive/lifeflow-nuxt/nuxt.config.ts')
const nuxtConfig = readFileSync(nuxtConfigPath, 'utf-8')

const urlMatch = nuxtConfig.match(/url:\s*['"]([^'"]+)['"]/)
const keyMatch = nuxtConfig.match(/key:\s*['"]([^'"]+)['"]/)

const supabaseUrl = urlMatch ? urlMatch[1] : null
const supabaseKey = keyMatch ? keyMatch[1] : null

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials')
  process.exit(1)
}

const client = createClient(supabaseUrl, supabaseKey)

/**
 * Delete transaction and restore wallet balance
 */
async function deleteTransaction(transactionId) {
  try {
    // Get transaction first
    const { data: transaction, error: fetchError } = await client
      .from('transactions')
      .select('*')
      .eq('id', transactionId)
      .single()

    if (fetchError) throw fetchError
    if (!transaction) {
      console.error('❌ Transaction not found')
      process.exit(1)
    }

    console.log(`📝 Deleting transaction:`)
    console.log(`   Description: ${transaction.description}`)
    console.log(`   Amount: ${transaction.amount} ${transaction.currency}`)
    console.log(`   Type: ${transaction.type}`)
    console.log(`   Date: ${transaction.date}`)

    // Restore wallet balance
    if (transaction.wallet_id && transaction.type !== 'transfer') {
      const delta = transaction.type === 'income' ? -transaction.amount : transaction.amount

      const { data: wallet, error: fetchWalletError } = await client
        .from('wallets')
        .select('balance')
        .eq('id', transaction.wallet_id)
        .single()

      if (fetchWalletError) {
        console.error(`⚠️  Warning: Could not fetch wallet:`, fetchWalletError.message)
      } else {
        const newBalance = Number(wallet.balance) + delta

        const { error: updateError } = await client
          .from('wallets')
          .update({ balance: newBalance })
          .eq('id', transaction.wallet_id)

        if (updateError) {
          console.error(`⚠️  Warning: Could not restore wallet balance:`, updateError.message)
        } else {
          console.log(`🏦 Restored wallet balance: ${newBalance}`)
        }
      }
    }

    // Delete transaction
    const { error: deleteError } = await client
      .from('transactions')
      .delete()
      .eq('id', transactionId)

    if (deleteError) throw deleteError

    console.log('✅ Transaction deleted successfully!')

  } catch (error) {
    console.error('❌ Error deleting transaction:', error.message)
    process.exit(1)
  }
}

/**
 * List transactions (optional filter)
 */
async function listTransactions(filter = {}) {
  try {
    let query = client
      .from('transactions')
      .select('id, description, amount, currency, type, category, date')
      .order('date', { ascending: false })
      .limit(20)

    if (filter.description) {
      query = query.ilike('description', `%${filter.description}%`)
    }

    if (filter.date) {
      query = query.eq('date', filter.date)
    }

    const { data, error } = await query

    if (error) throw error

    if (!data || data.length === 0) {
      console.log('📭 No transactions found')
      return
    }

    console.log(`\n📋 Transactions:`)
    console.log('─'.repeat(80))
    data.forEach((t, i) => {
      console.log(`${i + 1}. ${t.description} - ${t.amount} ${t.currency} (${t.type})`)
      console.log(`   ID: ${t.id}`)
      console.log(`   📅 ${t.date} | 📁 ${t.category}`)
    })
    console.log('─'.repeat(80))

    return data
  } catch (error) {
    console.error('❌ Error listing transactions:', error.message)
    process.exit(1)
  }
}

// CLI usage
async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log(`
╔══════════════════════════════════════════════════╗
║     Supabase Finance - Delete Transaction          ║
╚══════════════════════════════════════════════════╝

Usage:
  node delete-transaction.js <transaction_id>
  node delete-transaction.js list [--date=YYYY-MM-DD] [--desc="keyword"]

Examples:
  node delete-transaction.js 123e4567-e89b-12d3-a456-426614174000
  node delete-transaction.js list
  node delete-transaction.js list --date=2026-01-17
  node delete-transaction.js list --desc="กาแฟ"
    `)
    process.exit(0)
  }

  if (args[0] === 'list') {
    const filter = {}
    args.slice(1).forEach(arg => {
      if (arg.startsWith('--date=')) {
        filter.date = arg.split('=')[1]
      } else if (arg.startsWith('--desc=')) {
        filter.description = arg.split('=')[1].replace(/"/g, '')
      }
    })
    await listTransactions(filter)
  } else {
    const transactionId = args[0]
    await deleteTransaction(transactionId)
  }
}

main()
