#!/usr/bin/env node
/**
 * Update transaction by description and amount
 * Usage: node update-transaction.js "<description>" <amount> <new-date>
 * Example: node update-transaction.js "ข้าว" 120 2026-01-22
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const nuxtConfigPath = resolve(process.env.HOME, 'Documents/Claude Code/Productive/lifeflow-nuxt/nuxt.config.ts')
const nuxtConfig = readFileSync(nuxtConfigPath, 'utf-8')

const urlMatch = nuxtConfig.match(/url:\s*['"]([^'"]+)['"]/)
const keyMatch = nuxtConfig.match(/key:\s*['"]([^'"]+)['"]/)

const supabaseUrl = urlMatch ? urlMatch[1] : null
const supabaseKey = keyMatch ? keyMatch[1] : null

const client = createClient(supabaseUrl, supabaseKey)

async function updateTransaction(description, amount, newDate) {
  try {
    // Find transaction by description AND amount
    const { data: tx, error: fetchError } = await client
      .from('transactions')
      .select('*')
      .eq('description', description)
      .eq('amount', amount)
      .order('date', { ascending: false })
      .limit(1)

    if (fetchError) throw fetchError
    if (!tx || tx.length === 0) {
      console.log(`❌ Transaction not found: "${description}" (${amount} THB)`)
      return false
    }

    // Update date
    const { error } = await client
      .from('transactions')
      .update({ date: newDate })
      .eq('id', tx[0].id)

    if (error) throw error

    console.log(`✅ Updated: "${description}" (${tx[0].amount} THB) → ${newDate}`)
    return true
  } catch (error) {
    console.error('❌ Error:', error.message)
    return false
  }
}

const desc = process.argv[2]
const amt = parseFloat(process.argv[3])
const newDate = process.argv[4]

if (!desc || !amt || !newDate) {
  console.log(`
Usage: node update-transaction.js "<description>" <amount> <new-date>

Example: node update-transaction.js "ข้าว" 120 2026-01-22
  `)
  process.exit(0)
}

updateTransaction(desc, amt, newDate)
