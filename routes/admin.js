const router = require("express").Router();
const baixarmusica = require("../functions/download");

router.get( "/", (req, res) => {
    res.render("home");
})

router.post( "/baixar", (req, res) => {
    baixarmusica(req, res);
})

module.exports = router;