import { Request, Response } from "express";
const prisma = require('../../../../prisma/prismaClient');

exports.postPostingan = async (req : Request, res : Response) => {
    const {idUser, title} = req.body;

    if (!idUser || !title) {
        return res.status(400).send("idUser and title are required");
    }

    try {
        const postingan = await prisma.posting.create({
            data : {
                title: title,
                user: {
                    connect: { id: parseInt }, 
                },
            }
        })

        res.status(200).send("succes");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

exports.postImage = async (req : Request, res : Response) => {
    const {idPosting} = req.body
    const image = req.file ? `${req.protocol}://192.168.100.3:3030/uploads/${req.file.filename}` : ''

    try {
        const post = await prisma.image.create({
            data : {
                image : image,
                posting : {
                    connect : { id : idPosting.toString() }
                }
            }
        })
 
        res.status(200).send("succes");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}