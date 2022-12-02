const router = require("express").Router();
const fs = require("fs");
const baixarmusica = require("../public/download");
const ytdl = require("ytdl-core");

router.get("/", (req, res) => {
    res.render('home');
})

router.get("/download", (req, res) => {
    res.sendFile(__dirname + "/pages/download.html");
})

router.post("/select", async(req, res) => {
    let tipo = req.body.tipo;
    let link = req.body.link;
    let info = await ytdl.getInfo(link);

    let files = fs.readdirSync("./static/cache/");

    files.forEach(file => {
        fs.rm("./static/cache/" + file, function (err) {
            if (err) throw err;
        });  
    });
    
    baixarmusica(tipo, info);
    
    res.render('download', 
    { 
        videotitle: info.videoDetails.title, 
        thumb: info.videoDetails.thumbnails[0].url, 
        format: req.body.tipo
    })
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

    files.forEach(file => {
        fs.rm("./static/cache/" + file, function (err) {
            if (err) throw err;
        });  
    });
})

module.exports = router;