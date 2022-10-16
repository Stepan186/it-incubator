import express, {Request, Response} from "express"
import { testingRouter, videosRouter } from "./routers/videos-router";
import bodyParser from "body-parser";

const app = express()
const port = process.env.PORT || 3000
const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/videos', videosRouter)
app.use('/testing', testingRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
