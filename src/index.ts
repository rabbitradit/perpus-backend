import express, { Express } from "express";

const app: Express = express()
app.use(express.json())
const port = 3000

import router from "./routers";
app.use(router)

app.listen(port, () => {
    console.log(`[server] Server is running on http://localhost:${port}`)
})