import { readDB, writeDB } from '../config/database.js'

export const addPoints = async (req, res) => {
  try {
    const { userId, points } = req.body
    const db = await readDB()

    const userIndex = db.users.findIndex(u => u.id === userId)
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' })
    }

    db.users[userIndex].points += points
    await writeDB(db)

    res.json({ 
      message: 'Points added successfully',
      points: db.users[userIndex].points 
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}