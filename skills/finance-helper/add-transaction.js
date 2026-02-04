#!/usr/bin/env node
/**
 * Add Transaction to Supabase
 * Usage: node add-transaction.js <input>
 * Example: node add-transaction.js "ซื้ออาหาร 75 บาท"
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
  console.error(`Looking for nuxt.config.ts at: ${nuxtConfigPath}`)
  process.exit(1)
}

// Initialize Supabase client
const client = createClient(supabaseUrl, supabaseKey)

/**
 * Parse natural language transaction input
 */
function parseTransaction(text) {
  const transaction = {
    description: text,
    amount: 0,
    currency: 'THB',
    type: 'expense',
    category: 'ทั่วไป',
    date: new Date().toISOString().split('T')[0],
    wallet: null,
    notes: null,
    tags: null
  }

  // Store original text for clean description
  const originalText = text

  // Extract date (format: "วันที่ 17", "17", "2026-01-17")
  const dateMatch = text.match(/วันที่\s*(\d{1,2})/)
  if (dateMatch) {
    const day = parseInt(dateMatch[1], 10)
    const now = new Date()
    // Set day while keeping timezone consistent
    const targetDate = new Date(now)
    targetDate.setDate(day)
    transaction.date = targetDate.toISOString().split('T')[0]
    // Remove date from text before processing
    text = text.replace(/วันที่\s*\d{1,2}/, '')
  }

  // Detect type FIRST (before removing keywords for category detection)
  if (text.includes('เงินเข้า') || text.includes('รายได้') || text.includes('เงินรับ') ||
      text.includes('โอนให้') || text.includes('เพื่อนโอน') || text.includes('ได้มา') || text.includes('รับมา') ||
      text.includes('รับโอน')) {
    transaction.type = 'income'
  } else if (text.includes('โอน') || text.includes('transfer')) {
    transaction.type = 'transfer'
  }

  // Remove type keywords before category detection
  text = text
    .replace(/เงินเข้า/g, '')
    .replace(/รายได้/g, '')
    .replace(/เงินรับ/g, '')
    .replace(/โอนให้/g, '')
    .replace(/เพื่อนโอน/g, '')
    .replace(/ได้มา/g, '')
    .replace(/รับมา/g, '')
    .replace(/รับโอน/g, '')
    .replace(/เงินรับโอน/g, '')

  // Category mapping (remove from text before processing)
  const categoryMappings = {
    // Food & Drink
    'ข้าว': 'food',
    'มื้อเย็น': 'food',
    'มื้อเช้า': 'food',
    'อาหาร': 'food',
    'ใส้กรอก': 'food',
    'ซอส': 'food',
    'เครื่องปรุง': 'food',
    'ขนม': 'food',
    'ผลไม้': 'food',
    'ผัก': 'food',
    'ของกิน': 'food',

    // Alcohol
    'เบียร์': 'alcohol',
    'เหล้า': 'alcohol',
    'วอดก้า': 'alcohol',
    'ไวน์': 'alcohol',
    'สุรา': 'alcohol',
    'หวาน': 'alcohol',

    // Health
    'ยา': 'health',
    'คลินิก': 'health',
    'โรงพยาบาล': 'health',
    'แพทย์': 'health',
    'หมอ': 'health',
    'เข็ม': 'health',
    'วัคซีน': 'health',
    'ตรวจสุขภาพ': 'health',
    'อุปกรณ์แพทย์': 'health',

    // Travel
    'บัส': 'travel',
    'เบิโก': 'travel',
    'รถ': 'travel',
    'รถไฟฟ้า': 'travel',
    'แท็กซี่': 'travel',
    'บูส': 'travel',
    'เช่า': 'travel',
    'ปาย': 'travel',
    'นั่งรถ': 'travel',
    'เดินทาง': 'travel',
    'ตั๋ว': 'travel',

    // Shopping
    'เสื้อ': 'shopping',
    'กางเกง': 'shopping',
    'รองเท้า': 'shopping',
    'หมวก': 'shopping',
    'กระเป๋า': 'shopping',
    'ผ้า': 'shopping',
    'เฟอร์': 'shopping',
    'เครื่องใช้': 'shopping',
    'ของตกแต่ง': 'shopping',

    // Technology
    'คอมพิวเตอร์': 'technology',
    'โน้ตบุ๊ก': 'technology',
    'แท็บเล็ต': 'technology',
    'มือถือ': 'technology',
    'เกมส์': 'technology',
    'ซอฟต์แวร์': 'technology',
    'โปรแกรม': 'technology',
    'แอป': 'technology',
    'ฮาร์ดแวร์': 'technology',
    'ไอที': 'technology',
    'pc': 'technology',
    'laptop': 'technology',

    // Internet
    'อินเทอร์': 'internet',
    'ไฟเบอร์': 'internet',
    'เน็ต': 'internet',
    'wifi': 'internet',
    'internet': 'internet',
    'ความเร็วสูง': 'internet',
    'broadband': 'internet',

    // Home
    'ไฟ': 'bills',
    'น้ำประปา': 'bills',
    'อุปกรณ์บ้าน': 'home',
    'ตกแต่งบ้าน': 'home',
    'ซ่อมบ้าน': 'home',
    'ปรับปรุงบ้าน': 'home',
    'ที่อยู่อาศัย': 'home',
    'คอนโด': 'home',
    'ห้อง': 'home',

    // Bills
    'บิล': 'bills',
    'ค่าน้ำ': 'bills',
    'ค่าไฟ': 'bills',
    'ค่าโทรศัพท์': 'bills',
    'ค่าน้ำมัน': 'bills',
    'ธนาคาร': 'bills',
    'บัตร': 'bills',

    // Gifts
    'ของขวัญ': 'gift',
    'ฉลอง': 'gift',
    'วันเกิด': 'gift',
    'แต่งงาน': 'gift',
    'งานแต่ง': 'gift',
    'ปีใหม่': 'gift',
    'คริสมาสต์': 'gift',

    // Entertainment
    'หนัง': 'entertainment',
    'เพลง': 'entertainment',
    'คอนเสิร์ต': 'entertainment',
    'เกม': 'entertainment',
    'ดู': 'entertainment',
    'เล่น': 'entertainment',

    // Sports
    'ฟุตบอล': 'sports',
    'สนาม': 'sports',
    'วิ่ง': 'sports',
    'ออกกำลัง': 'sports',
    'ยิม': 'sports',

    // Education
    'คอร์ส': 'education',
    'หนังสือ': 'education',
    'สอน': 'education',
    'เรียน': 'education',
    'ติว': 'education'
  }

  for (const [key, value] of Object.entries(categoryMappings)) {
    if (text.includes(key)) {
      transaction.category = value
      text = text.replace(key, '')
      break
    }
  }

  // Extract amount (from remaining text)
  const amountMatch = text.match(/(\d+(?:\.\d+)?)/)
  if (amountMatch) {
    transaction.amount = parseFloat(amountMatch[1])
  }

  // Detect currency
  if (text.includes('$') || text.includes('USD') || text.includes('usd')) {
    transaction.currency = 'USD'
  }

  // Detect type
  if (text.includes('ได้มา') || text.includes('รายได้') || text.includes('เงินเข้า') || text.includes('รับมา')) {
    transaction.type = 'income'
  } else if (text.includes('โอน') || text.includes('transfer')) {
    transaction.type = 'transfer'
  }

  // Clean description: remove numbers, currency words, "จากบัญชี", date keywords, and wallet names
  let desc = originalText
    .replace(/วันที่\s*\d{1,2}/g, '')  // Remove "วันที่ 17"
    .replace(/\d+(?:\.\d+)?/g, '')  // Remove numbers
    .replace(/\s*บาท/g, '')       // Remove "บาท"
    .replace(/\s*THB/g, '')         // Remove "THB"
    .replace(/\s*USD/g, '')         // Remove "USD"
    .replace(/\s*\$/g, '')          // Remove "$"
    .replace(/จากบัญชี\s*/g, '')  // Remove "จากบัญชี"
    .replace(/บัญชี\s*/g, '')      // Remove "บัญชี"
    .replace(/เงินเข้า/g, '')      // Remove "เงินเข้า"
    .replace(/รายได้/g, '')       // Remove "รายได้"
    .replace(/เงินรับ/g, '')       // Remove "เงินรับ"
    .replace(/โอนให้/g, '')       // Remove "โอนให้"
    .replace(/เพื่อนโอน/g, '')     // Remove "เพื่อนโอน"
    .replace(/ได้มา/g, '')        // Remove "ได้มา"
    .replace(/รับมา/g, '')        // Remove "รับมา"
    .replace(/รับโอน/g, '')       // Remove "รับโอน"
    .replace(/เงินรับโอน/g, '')   // Remove "เงินรับโอน"
    .trim()

  // Remove wallet names from description
  const walletNames = ['make', 'cashbox', 'krungsri', 'kbank', 'scb', 'tmb', 'ttb']
  for (const wallet of walletNames) {
    desc = desc.replace(new RegExp(wallet, 'gi'), '')
  }

  // Clean up extra whitespace
  desc = desc.replace(/\s+/g, ' ').trim()
  transaction.description = desc || transaction.description

  // Detect categories (use cleaned description)
  // Skip category detection if already set by mapping
  if (transaction.category === 'ทั่วไป') {
    const categories = {
      'อาหาร': ['ซื้ออาหาร', 'กินข้าว', 'มื้อเย็น', 'มื้อเช้า', 'ประจำ', 'น้ำ', 'คาเฟ่', 'กาแฟ', 'ร้านอาหาร', 'เครื่องดื่ม', 'ของกิน', 'อาหาร'],
      'เดินทาง': ['บัส', 'เบิโก', 'รถ', 'รถไฟฟ้า', 'แท็กซี่', 'บูส', 'เช่า', 'ปาย', 'นั่งรถ', 'เดินทาง', 'ประกัน', 'ขายตั๋ว'],
      'ช้อป': ['ช้อปประ', 'เสื้อ', 'ผ้า', 'เฟอร์', 'ของใช้', 'เครื่อง', 'เครื่องดำเนิน', 'เฟอร์นิเจอร์', 'เครื่องใช้ไฟฟ้า', 'ของตกแต่ง'],
      'คอมพิวเตอร์': ['คอมพิวเตอร์', 'โน้ตบุ๊ก', 'เกมส์', 'ไอที', 'ซอฟต์แวร์', 'โปรแกรม', 'แอป', 'ฮาร์ดแวร์', 'gaming', 'pc', 'laptop'],
      'อินเทอร์เน็ต': ['อินเทอร์', 'ไฟเบอร์', 'เน็ต', 'wifi', 'internet', 'ความเร็วสูง', 'broadband'],
      'บ้าน': ['ไฟ', 'น้ำประปา', 'อุปกรณ์', 'ตกแต่ง', 'ซ่อม', 'ปรับปรุง', 'บ้าน', 'คอนโด', 'ห้อง', 'ที่อยู่อาศัย'],
      'ยา': ['ยา', 'คลินิก', 'โรงพยาบาล', 'สุขภาพ', 'แพทย์', 'หมอ', 'เข็ม', 'วัคซีน', 'ตรวจสุขภาพ'],
      'ของขวัญ': ['ของขวัญ', 'ฉลอง', 'วันเกิด', 'แต่งงาน', 'งานแต่ง', 'ปีใหม่', 'คริสมาสต์'],
      'บิล': ['ธนาคาร', 'บัตร', 'เงิน', 'บิล', 'ค่าใช้จ่าย', 'ค่าน้ำ', 'ค่าไฟ', 'ค่าโทรศัพท์'],
      'อื่นๆ': ['ทั่วไป', 'อื่น', 'misc', 'other']
    }

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(k => desc.toLowerCase().includes(k.toLowerCase()))) {
        transaction.category = category
        break
      }
    }
  }

  // Default category for income is "income" instead of "ทั่วไป"
  if (transaction.type === 'income' && transaction.category === 'ทั่วไป') {
    transaction.category = 'income'
  }

  // Extract wallet (use cleaned description)
  const wallets = [
    'cashbox', 'make', 'krungsri', 'kbank', 'scb', 'tmb', 'ttb',
    'กสิกรไทย', 'กรุงเทพ', 'ทหารไทย', 'ไทยพาณิชย์', 'ออมสิน',
    'truewallet', 'true money', 'ทรูวอลเล็ต',
    'payoneer', 'paypal'
  ]

  for (const wallet of wallets) {
    if (desc.toLowerCase().includes(wallet.toLowerCase())) {
      transaction.wallet = wallet
      break
    }
  }

  return transaction
}

/**
 * Find wallet by name
 */
async function findWalletByName(name) {
  try {
    const { data, error } = await client
      .from('wallets')
      .select('*')
      .ilike('name', `%${name}%`)

    if (error) {
      console.error(`⚠️  Warning finding wallet:`, error.message)
      return null
    }

    return data?.[0]
  } catch (e) {
    console.error(`⚠️  Warning finding wallet:`, e.message)
    return null
  }
}

/**
 * Add transaction to Supabase
 */
async function addTransaction(transactionData) {
  try {
    // Find wallet if specified
    let walletId = null
    if (transactionData.wallet) {
      const wallet = await findWalletByName(transactionData.wallet)
      if (wallet) {
        walletId = wallet.id
      } else {
        console.log(`⚠️  Warning: Wallet "${transactionData.wallet}" not found, skipping wallet update`)
      }
    }

    // Insert transaction
    const { data, error } = await client
      .from('transactions')
      .insert({
        description: transactionData.description,
        amount: transactionData.amount,
        currency: transactionData.currency,
        type: transactionData.type,
        category: transactionData.category,
        category_id: null,
        subcategory_id: null,
        date: transactionData.date,
        wallet_id: walletId,
        notes: transactionData.notes,
        tags: transactionData.tags,
      })
      .select()
      .single()

    if (error) throw error

    console.log('✅ Transaction added successfully!')
    console.log(`📝 Description: ${transactionData.description}`)
    console.log(`💰 Amount: ${transactionData.amount} ${transactionData.currency}`)
    console.log(`📊 Type: ${transactionData.type}`)
    console.log(`📁 Category: ${transactionData.category}`)
    console.log(`📅 Date: ${transactionData.date}`)

    // Update wallet balance
    if (walletId && transactionData.type !== 'transfer') {
      const delta = transactionData.type === 'income' ? transactionData.amount : -transactionData.amount

      const { data: wallet, error: fetchError } = await client
        .from('wallets')
        .select('balance')
        .eq('id', walletId)
        .single()

      if (fetchError) {
        console.error(`⚠️  Warning: Could not fetch wallet:`, fetchError.message)
      } else {
        const newBalance = Number(wallet.balance) + delta

        const { error: updateError } = await client
          .from('wallets')
          .update({ balance: newBalance })
          .eq('id', walletId)

        if (updateError) {
          console.error(`⚠️  Warning: Could not update wallet balance:`, updateError.message)
        } else {
          console.log(`🏦 Updated wallet balance: ${newBalance}`)
        }
      }
    }

    return data
  } catch (error) {
    console.error('❌ Error adding transaction:', error.message)
    process.exit(1)
  }
}

// CLI usage
async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log(`
╔══════════════════════════════════════════════════╗
║     Supabase Finance - Add Transaction              ║
╚══════════════════════════════════════════════════╝

Usage:
  node add-transaction.js "<input>"

Examples:
  node add-transaction.js "ซื้้ออาหาร 75 บาท"
  node add-transaction.js "ได้มา 5000 บาท"
  node add-transaction.js "ซื้้อคอมพิวเตอร์ 15000 บาท"
  node add-transaction.js "คอมพิวเตอร์ 15000"

Features:
  • Natural language (ภาษาไทย)
  • Auto-detect amount, currency, type, category
  • Auto-update wallet balance (if found)
    `)
    process.exit(0)
  }

  const input = args[0]
  const transaction = parseTransaction(input)

  // Validate
  if (!transaction.description) {
    console.error('❌ Error: Description is required')
    process.exit(1)
  }

  if (!transaction.amount || transaction.amount === 0) {
    console.error('❌ Error: Amount is required')
    process.exit(1)
  }

  console.log(`\n📝 Adding transaction...`)
  await addTransaction(transaction)
}

main()
