import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
        success: false,
      });
    }

    let decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    try {
      const user = await db.user.findUnique({
        where: {
          id: decodedToken.id,
        },
        select: {
          id: true,
          image: true,
          name: true,
          email: true,
          role: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
      req.user = user
      next()
    } catch (error) {
      return res.status(401).json({
        message: "Please login first",
        success: false,
        error,
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Please login first",
      success: false,
      error,
    });
  }
};

export {authMiddleware}