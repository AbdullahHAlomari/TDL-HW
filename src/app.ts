import express, {Application} from 'express';
import useRoute from './Routes/useRoute'
import connectDB from './config/db'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import cors from 'cors'

const app:Application = express()
dotenv.config()
app.use(cors())
app.use(express.json())
connectDB()
app.use('/', useRoute)


let port = process.env.PORT || 3005
app.listen(port,()=> console.log(`Express started ${port}`))






// const secret = "Secret"

// let enToken = jwt.sign({name: "Abdullah", role:"Admin"}, secret, {expiresIn: "3h"})
// console.log(enToken);

// let deToken = jwt.verify(enToken, secret)
// console.log(deToken);