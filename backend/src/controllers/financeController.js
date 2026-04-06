import { readDB, writeDB } from '../config/database.js'

export const addTransaction = async (req, res) => {
  try {
    const { type, amount, category, description } = req.body

    const userId = req.user.id

    if (!type || !amount || !category) {
      return res.status(400).json({ error: 'Type, amount, dan category wajib diisi' })
    }

    if (type !== 'income' && type !== 'expense') {
      return res.status(400).json({ error: 'Type harus income atau expense' })
    }

    const db = await readDB()

    if (!db.transactions) db.transactions = []

    const newTransaction = {
      id: Date.now().toString(),
      userId,
      type,
      amount: Number(amount),
      category,
      description: description || '',
      createdAt: new Date().toISOString()
    }

    db.transactions.push(newTransaction)
    await writeDB(db)

    res.status(201).json({
      message: 'Transaksi berhasil ditambahkan',
      transaction: newTransaction
    })
  } catch (error) {
    console.error('Add transaction error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}


export const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id

    const db = await readDB()
    if (!db.transactions) db.transactions = []

    const userTransactions = db.transactions.filter(t => t.userId === userId)

    const totalIncome = userTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const totalExpense = userTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    res.json({
      transactions: userTransactions,
      summary: {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense
      }
    })
  } catch (error) {
    console.error('Get transactions error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}


export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const db = await readDB()
    if (!db.transactions) db.transactions = []

    const transaction = db.transactions.find(t => t.id === id)

    if (!transaction) {
      return res.status(404).json({ error: 'Transaksi tidak ditemukan' })
    }

    if (transaction.userId !== userId) {
      return res.status(403).json({ error: 'Tidak boleh hapus transaksi orang lain' })
    }

    db.transactions = db.transactions.filter(t => t.id !== id)
    await writeDB(db)

    res.json({ message: 'Transaksi berhasil dihapus' })
  } catch (error) {
    console.error('Delete transaction error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}