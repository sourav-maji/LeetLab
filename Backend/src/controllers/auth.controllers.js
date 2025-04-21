import express from "express"
import bcrypt from "bcryptjs"
import { db } from "../libs/db.js"
import { UserRole } from "../generated/prisma/index.js"
import jwt from "jsonwebtoken"

const register= async(req, res) =>{
const {email,password,name} = req.body

try {
    
    const existingUser = await db.user.findUnique({
        where:{
            email
        }
    })
    // console.log(existingUser);
    if(existingUser){
        return res.status(400).json({"message" : "User already exists"})
    }
    
    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = await db.user.create({
        data :{
            email,
            password : hashedPassword,
            name,
            role : UserRole.USER
        }
    })

    const token = jwt.sign({id:newUser.id}, process.env.JWT_SECRET, {expiresIn :"7d"})

    res.cookie("jwt", token,{
        httpOnly: true,
        sameSite : "strict",
        secure : process.env.NODE_ENV !== "development",
        maxAge: 1000 * 60 *60 *24 *7
    })

    res.status(201).json({
        success : true,
        message : "User created successfully",
        data : {
            id : newUser.id,
            email : newUser.email,
            name : newUser.name,
            role : newUser.role,
            image : newUser.image
        }
    })

} catch (error) {
    console.log(error);
    res.status(500).json({
        message:"Error creating user",
        error
    })
    
    
}
}

const login = async( req,res)=>{

}

const logout = async( req,res)=>{

}
const check = async( req,res)=>{

}

export {register,login,logout,check}