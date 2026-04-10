import express from 'express'
import { addPoints } from '../controllers/userController.js'

const router = express.Router()

router.post('/points', addPoints)

export default router