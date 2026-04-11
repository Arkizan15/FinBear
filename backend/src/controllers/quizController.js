import { readDB } from '../config/database.js'

export const getQuizById = async (req, res) => {
  try {
    const db = await readDB()
    const quiz = db.quizzes.find(q => String(q.id) === String(req.params.id))
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' })
    }
    res.json(quiz)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}