import {PrismaClient} from '@prisma/client'
import { error } from 'console';
const prisma = new PrismaClient();
import express, {Request,Response} from 'express';

export const createTask = async(req:Request, res:Response) =>{
    const {title, description, id} = req.body

    const task = await prisma.task.create({
        data:{
            title, 
            description,
            task_ID: id
        }
    });
    res.json(task)
}

export const getTaskById = async(req:Request, res:Response)=>{
    const {id, title, description} = req.body

    const getTask = await prisma.task.findMany({
        where:{
            task_ID: id
        },
        select:{
            title: true,
            description: true
        }
    })
    res.json(getTask)
}

export const deleteTask = async(req:Request, res:Response)=>{
    const {id} = req.body
    const task = await prisma.task.delete({
        where:{
            id: id
        }
    })
    res.json(task)
}