const router = require("express").Router();
const fs = require("fs");
const ytdl = require("ytdl-core");
const downloadFile = require("../functions/downloadFile");

function verifyDownload(req, res, next) {
    let files = fs.readdirSync("./temp/");
 
    if (files.length > 0) {
      next(); // Permitir o acesso à rota
    } else {
      res.redirect("/");
    }
}

router.get("/", (req, res) => {
    res.render('home');
})

router.post("/", async(req, res) => {
    let tipo = req.body.tipo;
    let link = req.body.link;

    try {
        let info = await ytdl.getInfo(link)
        let files = fs.readdirSync("./temp/");

        files.forEach(file => {
            fs.rm("./temp/" + file, function (err) {
                if (err) throw err;
            });  
        });
        
        downloadFile(tipo, info);
        
        res.render('download', { 
            videotitle: info.videoDetails.title, 
            thumb: info.videoDetails.thumbnails[0].url, 
            format: req.body.tipo
        })
    } catch (error) {
        res.render('home', { error: error})
    }
})

router.get("/download", verifyDownload, (req, res) => {
    let files = fs.readdirSync("./temp/");

    res.download("./temp/" + files[0], function(err) {
        if (err) {
            console.error('Ocorreu um erro ao fazer o download do arquivo:', err);
            res.status(500).send('Ocorreu um erro ao fazer o download do arquivo.');
        } 
    });
})


module.exports = router;