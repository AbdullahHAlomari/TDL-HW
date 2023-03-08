import { createTask, deleteTask, getTaskById } from '../controller/taskCont'
import { Login, createUser } from '../controller/userCont'
import validate  from '../middleware/validate'
import express, { Router } from 'express'
import {auth} from './../middleware/auth'
let router = express.Router()
import {z} from 'zod'
import { RegisterTypes } from '../zod/zodValid'

router.post('/createuser', createUser)
router.get('/login', validate(RegisterTypes), Login )
// Task Section
router.post('/createtask', createTask)
router.get('/byid', auth, getTaskById)
router.delete('deltask', deleteTask)




export default router