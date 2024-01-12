import path from "path";
import multer from "multer";
import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import session from "express-session";
import findOrCreate from "mongoose-findorcreate";
import { Home } from "../controllers/home.js";
import { User } from "../models/userSchema.js";
import { connectDB } from "../db/connection.js";
import GoogleStrategy from "passport-google-oauth20";



export { express, multer, session, Home, connectDB, findOrCreate, mongoose, path, GoogleStrategy, bodyParser, passport, User };