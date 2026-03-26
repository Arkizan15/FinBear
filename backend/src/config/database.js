import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

// Setup __dirname untuk ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Menggunakan path dari variabel environment atau default 'data/database.json'
const defaultDbPath = path.resolve(__dirname, '../../data/database.json')
const dbPath = process.env.DB_FILE_PATH 
  ? path.resolve(__dirname, '../../', process.env.DB_FILE_PATH) 
  : defaultDbPath

// Inisialisasi struktur awal DB
const initialData = {
  users: [],
  modules: [],
  quizzes: [],
  achievements: [],
  userProgress: [],
  userAchievements: []
}

/**
 * Memastikan folder dan file database.json tersedia.
 */
export const initDB = async () => {
  try {
    const dir = path.dirname(dbPath)
    
    // Cek folder, buat jika belum ada
    try {
      await fs.access(dir)
    } catch {
      await fs.mkdir(dir, { recursive: true })
    }

    // Cek file, buat dengan data kosong jika belum ada
    try {
      await fs.access(dbPath)
    } catch {
      await fs.writeFile(dbPath, JSON.stringify(initialData, null, 2), 'utf-8')
      console.log('✅ Initialized new JSON database at:', dbPath)
    }
  } catch (error) {
    console.error('❌ Failed to initialize JSON database:', error)
    throw error
  }
}

/**
 * Membaca data dari JSON
 */
export const readDB = async () => {
  try {
    const data = await fs.readFile(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('❌ Failed to read database:', error)
    throw error
  }
}

/**
 * Menulis data utuh ke JSON
 */
export const writeDB = async (data) => {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error('❌ Failed to write to database:', error)
    throw error
  }
}
