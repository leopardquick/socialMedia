import express from 'express'
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import compression from "compression"
import helmet from "helmet"
import userRoutes from './routes/user.routes'
import authRouetes from './routes/auth.routes'
import devBundle from './devBundle.js'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core'
import { StaticRouter } from 'react-router'
import { theme } from '../client/theme'
import MainRouter from '../client/MainRouter'
import Template from '../template'
import postRoute from './routes/post.routes'



const CURRENT_WORKING_DIR = process.cwd()
const app = express()

devBundle.compile(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(cookieParser())
app.use('/',userRoutes)
app.use('/',authRouetes)
app.use('/',postRoute)

//comment out before building for production



app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use((err,req,res,next)=>{
    if(err.name === 'UnatorizationError'){
        res.status('401').json({
            "error" : err.name + ":" + err.message
        })
    }else if(err){
        res.status(400).json({
            "error" : err.name + ":" + err.message
        })
    }
})


app.get('*',(req,res)=>{

    const sheets = new ServerStyleSheets()
    const context = {}
    const markup = ReactDOMServer.renderToString(
        sheets.collect(
            <StaticRouter location={req.url} context={context}>
              <ThemeProvider theme={theme}>
                <MainRouter />
              </ThemeProvider>
            </StaticRouter>
        )
    )

    if(context.url){
        return res.redirect(303,context.url)
    }

    const css = sheets.toString()
    
    res.status(200).send(Template({
        markup : markup ,
        css : css
    }))

})


export default app