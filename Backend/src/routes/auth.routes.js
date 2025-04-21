import express from "express"

import {register,login,logout,check} from "../controllers/auth.controllers.js"

const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.get("/check",check)

export default router