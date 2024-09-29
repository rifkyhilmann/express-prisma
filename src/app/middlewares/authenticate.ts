import { Request, Response, NextFunction } from "express";

const jwt = require('jsonwebtoken');
const prisma = require('../../../prisma/prismaClient');
const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticate = async (req : Request, res : Response, next : NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1]; 

    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id, 
            },
        });

        if (!user || user.token !== token) {
            return res.status(401).send("Invalid token.");
        }

        next(); 
    } catch (error) {
        return res.status(400).send("Invalid token.");
    }
}