const ytdl = require("ytdl-core");
const fs = require("fs");

async function baixarmusica(tipo, info) {
    if(!fs.existsSync("./static/cache")) {
        fs.mkdirSync("./static/cache");
    }

    let videotitle = info.videoDetails.title;

    let format;
    let download;
    let path;
    
    let er = /[^a-z0-9-g()]/gi;
    videotitle = videotitle.replace(er, " ");

    switch (tipo) {
        case "MP3":
            format = ".mp3";
            download = ytdl.downloadFromInfo(info, {filter: 'audioonly'})
            path = "./static/cache/"
            break;
        case "MP4":
            format = ".mp4";
            download = ytdl.downloadFromInfo(info, {filter: 'videoandaudio'});
            path = "./static/cache/"
            break;
        default:
            format = ".mp3";
            download = ytdl.downloadFromInfo(info, {filter: 'audioonly'});
            path = "./static/cache/"
            break;
    }

    const WriteStream = fs.createWriteStream(path + videotitle + format);
    download.pipe(WriteStream);

}

module.exports = baixarmusica;