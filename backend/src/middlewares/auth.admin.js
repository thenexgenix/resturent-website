import express from "express";
import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
    // Extract token from cookies or authorization header
    const token =
        req.cookies?.["x-auth-token"] || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
        success: false,
        message: "Authorization denied. No token provided.",
        });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
        }
        if (decode.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admins only.",
        });
        }
        req.user = decode;
        next();
    } catch (error) {
        return res.status(500).json({
        success: false,
        message: "Internal server error",
        });
    }
    }