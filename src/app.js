import express  from "express";
import __dirname from "./utils.js";
import passport from "passport";
import viewRouter from './routes/views.router.js'
import cartRouter from './routes/cart.router.js'
import usersRouter from './routes/users.router.js'
import handlebars from 'express-handlebars'
import sessionRouter from './routes/session.router.js'
import mongoose from "mongoose";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";

const app =express();
const PORT=8080;

mongoose.set('strictQuery',false)
const connection= mongoose.connect('mongodb+srv://tinchila:martindotto@cluster0.oz3qdxp.mongodb.net/admin');

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

initializePassport();
app.use(passport.initialize())
app.use(cookieParser())
app.use('/', viewRouter)
app.use('/api/cart', cartRouter)
app.use('/api/users', usersRouter)
app.use('/api/sessions', sessionRouter)

const server =app.listen(PORT, () => console.log("Server Arriba"))