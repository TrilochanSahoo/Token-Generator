const {Router} = require("express")
const router = Router()
const tokenGenerator = require("./tokenGenerator")

router.use('/v1', tokenGenerator)

module.exports = router