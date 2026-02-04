#!/usr/bin/env node
/**
 * Update transaction date by description
 * Usage: node update-date.js "<description>" <new-date>
 * Example: node update-date.js "กาแฟ" 2026-01-22
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

async function updateDate(description, newDate) {
  try {
    // Find transaction by description (from today)
    const today = new Date().toISOString().split('T')[0]
    const { data: tx, error: fetchError } = await client
      .from('transactions')
      .select('*')
      .eq('description', description)
      .eq('date', today)
      .limit(1)

    if (fetchError) throw fetchError
    if (!tx || tx.length === 0) {
      console.log(`❌ Transaction not found: "${description}"`)
      return false
    }

    // Update date
    const { error } = await client
      .from('transactions')
      .update({ date: newDate })
      .eq('id', tx[0].id)

    if (error) throw error

    console.log(`✅ Updated: "${description}" → ${newDate}`)
    return true
  } catch (error) {
    console.error('❌ Error:', error.message)
    return false
  }
}

const desc = process.argv[2]
const newDate = process.argv[3]

if (!desc || !newDate) {
  console.log(`
Usage: node update-date.js "<description>" <new-date>

Example: node update-date.js "กาแฟ" 2026-01-22
  `)
  process.exit(0)
}

updateDate(desc, newDate)
