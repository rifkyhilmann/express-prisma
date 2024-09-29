import { Request, Response } from "express";
const prisma = require('../../../../prisma/prismaClient');

exports.getAllPosting = async (req : Request, res : Response) => {
    try {
        const postingan = await prisma.posting.findMany({
            include : {
                images : true,
                user : true
            }
        })

        if (!postingan) {
            return res.status(404).send("Postingan not found");
        }

        res.status(200).send(postingan)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}