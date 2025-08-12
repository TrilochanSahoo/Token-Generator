const express = require("express")
const cors = require("cors")
const app = express()
const apiRoutes = require('./src/api/v1/routes')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",apiRoutes)

const port = 3000

app.listen(port,()=>{
    console.log(`API listening on port ${port}`)
})