const {Router} = require("express")
const tokenRouter = Router()
const tokenGenerator = require("../controller/tokenGenerator.js")

tokenRouter.post('/tokenGenerator', tokenGenerator)

module.exports = tokenRouter