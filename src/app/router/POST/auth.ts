import { Request, Response } from "express";
const prisma = require('../../../../prisma/prismaClient');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

exports.signUp = async (req : Request, res : Response) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("All fields are required");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const Data = await prisma.user.create({
            data : {
                name : name,
                password : hashedPassword,
                email : email
            }
        })

        res.status(200).send("Succes")
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

exports.signIn = async (req : Request, res : Response) => {
    const {email, password} = req.body;

    if (!email && !password) {
        return res.status(403).send("Username and password required")
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send("Username and password incorrect");
        }

        const tokenPayload = {
            id : user.id,
            name : user.name
        }

        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn : '1h' })

        await prisma.user.update({
            where : {
                email : user.email,
            },
            data : {
                token : token
            }
        })

        res.status(200).json({
            message : "succes",
            token : token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("Error Server")
    }
}

exports.signOut = async (req : Request, res : Response) => {
    const {email} = req.body

    try {
        const data = await prisma.user.update({
            where : {
                email : email,
            },
            data : {
                token : null,
            }
        })

        res.status(200).send("success")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Error Server")        
    }
}