import express, { Express } from "express";
import cors from 'cors';

const app: Express = express()
app.use(express.json())
const port = 3100

let whitelist = ['http://localhost:3000']
app.use(cors({
    // origin: function(origin: any, callback: any) {
    //     if(whitelist.indexOf(origin) !== -1) {
    //         callback(null, true)
    //     } else {
    //         callback(new Error(('Not allowed by CORS')))
    //     }
    // }
    origin: '*'
}))

import router from "./routers";
app.use(router)

app.listen(port, () => {
    console.log(`[server] Server is running on http://localhost:${port}`)
})