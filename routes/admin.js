const router = require("express").Router();
const fs = require("fs");
const baixarmusica = require("../public/download");

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/home.html");
})

router.get("/download", (req, res) => {
    res.sendFile(__dirname + "/pages/download.html");
})

router.post("/select", (req, res) => {
    baixarmusica(req,res);
})

router.get("/downloaded", (req, res) => {
    let files = fs.readdirSync("./static/cache/");

    if(files.length > 0) {
        res.download("./static/cache/" + files[0], function(err) {
            if(err) throw err;
        });
    } else {
        res.redirect("/")
    }

    function apagar() {
        files.forEach(file => {
            fs.rm("./static/cache/" + file, function (err) {
                if (err) throw err;
            });  
        });
    }

    apagar()
})

module.exports = router;