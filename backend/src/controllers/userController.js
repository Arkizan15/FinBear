import { readDB, writeDB } from '../config/database.js'

export const addPoints = async (req, res) => {
  try {
    const { userId, points, moduleId } = req.body
    const db = await readDB()

    // Cek apakah user sudah claim poin untuk modul ini
    const alreadyClaimed = db.userProgress.find(
      p => p.userId === userId && p.moduleId === moduleId
    )

    if (alreadyClaimed) {
      return res.status(400).json({ error: 'Points already claimed for this module' })
    }

    // Tambah poin ke user
    const userIndex = db.users.findIndex(u => u.id === userId)
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' })
    }

    db.users[userIndex].points += points

    // Simpan progress ke userProgress
    db.userProgress.push({
      userId,
      moduleId,
      claimedAt: new Date().toISOString()
    })

    await writeDB(db)

    res.json({ 
      message: 'Points added successfully',
      points: db.users[userIndex].points 
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const checkProgress = async (req, res) => {
  try {
    const { userId, moduleId } = req.params
    const db = await readDB()

    const progress = db.userProgress.find(
      p => p.userId === userId && String(p.moduleId) === String(moduleId)
    )

    res.json({ completed: !!progress })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}