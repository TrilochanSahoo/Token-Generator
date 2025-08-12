const tokenGenerator = (req,res) => {
    res.status(200).json({
        data : "message"
    })
}

module.exports = tokenGenerator