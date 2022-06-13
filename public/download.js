const ytdl = require("ytdl-core");
const fs = require("fs");

async function baixarmusica(req, res) {
    let tipo = req.body.tipo;
    let link = req.body.link;
    let info = await ytdl.getInfo(link);
    let videotitle = info.videoDetails.title;
    let format;
    
    let er = /[^a-z0-9-g()]/gi;
    videotitle = videotitle.replace(er, " ");

    let download;

    switch (tipo) {
        case "MP3":
            format = ".mp3";
            download = ytdl.downloadFromInfo(info, {filter: 'audioonly'})
            break;
        case "MP4":
            format = ".mp4";
            download = ytdl.downloadFromInfo(info);
            break;
        default:
            format = ".mp3";
            download = ytdl.downloadFromInfo(info, {filter: 'audioonly'});
            break;
    }

    const WriteStream = fs.createWriteStream("./downloads/" + videotitle + format);
    download.pipe(WriteStream);
    res.redirect("/");
}

module.exports = baixarmusica;