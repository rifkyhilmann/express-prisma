
import { Request, Response } from "express";
const prisma = require('../../../../prisma/prismaClient');

exports.getUserByEmail = async (req : Request, res : Response) => {
    const {email} = req.params

    try {
        const user = await prisma.user.findUnique({
            where : {
                email : email
            }
        })

        if (!user) {
            return res.status(404).send("User not found.");
        }

        res.status(200).json(user)
    } catch (error) {

        res.status(500).send("internal server error")
    }
}