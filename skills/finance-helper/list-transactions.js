#!/usr/bin/env node
/**
 * List recent transactions from Supabase (with full IDs)
 * Usage: node list-transactions.js
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

const client = createClient(supabaseUrl, supabaseKey)

async function listTransactions() {
  try {
    const { data, error } = await client
      .from('transactions')
      .select('*')
      .order('date', { ascending: false })
      .limit(20)

    if (error) throw error

    console.log('\n📋 Recent Transactions:')
    console.log('─'.repeat(100))
    console.log(`ID                                | Date       | Type   | Amount    | Category | Description`)
    console.log('─'.repeat(100))

    data.forEach((tx, i) => {
      const date = tx.date.substring(0, 10)
      const type = tx.type.padEnd(6)
      const amount = `${tx.amount} ${tx.currency}`.padStart(12)
      const category = tx.category.substring(0, 10).padEnd(10)
      const desc = tx.description.substring(0, 35)
      console.log(`${tx.id} | ${date} | ${type} | ${amount} | ${category} | ${desc}`)
    })

    console.log('─'.repeat(100))
    console.log(`Total: ${data.length} transactions\n`)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

listTransactions()
