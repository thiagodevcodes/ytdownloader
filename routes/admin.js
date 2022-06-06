const ytdl = require("ytdl-core");
const fs = require("fs");
const { links } = require("express/lib/response");
const router = require("express").Router();

router.get( "/", (req, res) => {
    res.render("home")
})

router.post( "/baixar", (req, res) => {
    async function baixarmusica() {
        let tipo = req.body.tipo;
        let link = req.body.link;
        let info = await ytdl.getInfo(link);
        let videotitle = info.videoDetails.title;
        let format;
        
        let er = /[^a-z0-9-g()]/gi;
        videotitle = videotitle.replace(er, " ");

        if(tipo == "MP3") {
            format = ".mp3"
        } else {
            if(tipo == "MP4") {
                format = ".mp4"
            } else {
                format = ".mp3"
            }
        }

        ytdl(link).pipe(fs.createWriteStream("./downloads/" + videotitle + format));
        res.redirect("/");
    }

    baixarmusica()
})

module.exports = router;