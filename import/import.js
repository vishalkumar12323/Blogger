import path from "path";
import multer from "multer";
import express from "express";
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
import { blogRouter } from "../routes/blog-router.js";



export { express, multer, cookieParser, session, Home, connectDB, findOrCreate, mongoose, path, GoogleStrategy, bodyParser, passport, Blog, User, blogRouter, };