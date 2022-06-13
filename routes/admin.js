const router = require("express").Router();
const baixarmusica = require("../public/download");

router.get( "/", (req, res) => {
    res.sendFile(__dirname + "/pages/home.html");
})

router.post( "/baixar", (req, res) => {
    baixarmusica(req, res);
})

module.exports = router;