import path from "path";
import bcrypt from "bcrypt";
import multer from "multer";
import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import findOrCreate from "mongoose-findorcreate";
import { Home } from "../controllers/home.js";
import { Blog } from "../models/blogSchema.js";
import { User } from "../models/userSchema.js";
import { connectDB } from "../db/connection.js";
import GoogleStrategy from "passport-google-oauth20";
import { router } from "../routes/user-router.js";
import { blogRouter } from "../routes/blog-router.js";
import { getToken, setToken } from "../middlewares/token-services.js";
import { authentication, checkUserAuth } from "../middlewares/authentication.js";



export { express, multer, cookieParser, session, Home, authentication, getToken, setToken, checkUserAuth, connectDB, findOrCreate, mongoose, path, GoogleStrategy, jwt, bcrypt, bodyParser, passport, Blog, User, router, blogRouter, };