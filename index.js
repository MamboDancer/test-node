import express from 'express'
import path from 'path'
import fs from 'fs'
import serverRoutes from './routes/servers.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import {checkUser} from './static/miscmethods.cjs'
import formidable from 'formidable'
//path.resolve(__dirname, etc,etc,etc)
const PORT = process.env.PORT ?? 3000
const app = express()
const __dirname = path.resolve()



app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(serverRoutes)

app.use(express.static(path.resolve(__dirname, 'static')))

app.use(cookieParser())
app.use(session({
    secret: 'gavnopidar',
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge:9999999}
}))

app.set('view engine', 'ejs')
app.set('views' , path.resolve(__dirname, 'ejs'))


app.get("/" , (req, res) =>
{
    let params = checkUser(req)
    res.render('index',{title: params[0], titleh1: params[1], isLogged: params[2], isAdmin: params[3]})

})
app.get("/login" , (req, res) =>
{   
})
app.post("/login" , (req, res) =>
{
    
    if(req.body.state)
    {
        req.session.user = req.body.user
        req.session.admin = req.body.admin
        res.redirect('/')
    }
    
})
app.post('/logout', (req,res) => 
{
   req.session.destroy()
   res.redirect('/')
})

app.post('/uploadimage', async (req,res, next) => 
{
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        const newpath = path.resolve(__dirname,'static','images' ,files.formImage.originalFilename);
        fs.rename(files.formImage.filepath, newpath, function (err) {
          if (err) throw err;
          res.redirect('/')
        })
})
})


app.listen(PORT, () =>
{
    console.log(`Express running on ${PORT}, View Engine is ${app.get("view engine")}, Views folder is ${app.get("views")}`)
})





