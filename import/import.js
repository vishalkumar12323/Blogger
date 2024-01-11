import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import multer from "multer";
import passport from "passport";
import session from "express-session";
import GoogleStrategy from "passport-google-oidc";
import { Home } from "../controllers/home.js";
import { blogPage, createBlog, deleteBlog, editBlog, updateBlog, userBlog, viewBlog } from "../controllers/blog.js";
import { Logout, getLoginPage, getSigninPage, login, signin } from "../controllers/user.js";
import { connectDB } from "../db/connection.js"
import { authentication, checkUserAuth } from "../middlewares/authentication.js";
import { getToken, setToken } from "../middlewares/token-services.js"
import { Blog } from "../models/blogSchema.js";
import { User } from "../models/userSchema.js";
import { blogRouter } from "../routes/blog-router.js";
import { router } from "../routes/user-router.js";
import { storage1, storage2 } from "../services/file-handle.js"



export { express, mongoose, path, multer, cookieParser, session, passport, GoogleStrategy, bodyParser, Blog, Home, User, blogPage, Logout, authentication, bcrypt, router, getToken, setToken, checkUserAuth, connectDB, getLoginPage, getSigninPage, login, signin, blogRouter, createBlog, deleteBlog, editBlog, updateBlog, userBlog, viewBlog, jwt, storage1, storage2 };