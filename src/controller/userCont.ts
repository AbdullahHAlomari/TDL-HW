import {PrismaClient} from '@prisma/client'
import { error } from 'console';
const prisma = new PrismaClient();
import express, {Request,Response} from 'express';
import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'
import e from 'express';
import * as dotenv from 'dotenv'

export const createUser = async(req:Request, res:Response) =>{
    try {
        const {username, email, password} = req.body
        console.log(req.body);
        
        
        // Hash the password using Argon2
        const hashedPassword = await argon2.hash(req.body.password)
        
        const user = await prisma.user.create({
            data:{
                username, 
                email, 
                password: hashedPassword // Store the hashed password in the database
            }
        });
        res.json(user)
    } catch (error) {
        console.log(error);
    }
}



export const Login = async(req:Request, res:Response) =>{
try {
    const {email, password} = req.body

    const log = await prisma.user.findUnique({
        where:{
            email, 
        }
    });
    if (!log) {
       return res.status(400).json({Message: "Wrong email"})
        
    } else if(!await argon2.verify(log.password, password)) {
        return res.status(400).json({Err: "Wrong password"})
        
    }
    const token = jwt.sign({ email: log.email }, process.env.API_SECRET as string, { expiresIn: '3h' });
    console.log(token);
    return res.json({ token , message: 'Logged in successfully' });
    
    
} catch (e) {
    console.log(e);
}
}