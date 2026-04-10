import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { readDB, writeDB } from '../config/database.js'

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    const db = await readDB()

    // Check if user exists
    const existingUser = db.users.find((u) => u.username === username)
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const newUser = {
      id: Date.now().toString(),
      username,
      password: hashedPassword,
      points: 0,
      createdAt: new Date().toISOString()
    }

    // Save to DB
    db.users.push(newUser)
    await writeDB(db)

    // Generate JWT for automatic login after signup
    const secret = process.env.JWT_SECRET || 'your_super_secret_jwt_key'
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      secret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newUser.id, username: newUser.username, points: newUser.points }
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    const db = await readDB()

    // Find user
    const user = db.users.find((u) => u.username === username)
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    // Generate JWT
    const secret = process.env.JWT_SECRET || 'your_super_secret_jwt_key'
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, points: user.points }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
