const router = require("express").Router();
const fs = require("fs");
const baixarMidia = require("../public/download");
const ytdl = require("ytdl-core");

router.get("/", (req, res) => {
    res.render('home');
})

router.post("/", async(req, res) => {
    let tipo = req.body.tipo;
    let link = req.body.link;

    try {
        let info = await ytdl.getInfo(link)
        let files = fs.readdirSync("./cache/");

        files.forEach(file => {
            fs.rm("./cache/" + file, function (err) {
                if (err) throw err;
            });  
        });
        
        baixarMidia(tipo, info);
        
        res.render('download', 
        { 
            videotitle: info.videoDetails.title, 
            thumb: info.videoDetails.thumbnails[0].url, 
            format: req.body.tipo
        })
    } catch (error) {
        res.render('home', { error: error})
    }
})

router.get("/download", (req, res) => {
    let files = fs.readdirSync("./cache/");

    res.download("./cache/" + files[0], function(err) {
        if(err) throw err;
    });
})

module.exports = router;