const ytdl = require("ytdl-core");
const fs = require("fs");

async function downloadFile(tipo, info) {
    let videotitle = info.videoDetails.title;

    let format;
    let download;
    let path;
    
    let er = /[^a-z0-9-g()]/gi;
    videotitle = videotitle.replace(er, " ");

    switch (tipo) {
        case "MP3":
            download = ytdl.downloadFromInfo(info, {filter: "audioonly"});
            path = "./temp/";
            format = ".mp3";
            break;
        case "MP4":
            download = ytdl.downloadFromInfo(info, {filter: "audioandvideo"});
            path = "./temp/";
            format = ".mp4";
           
            break;
        default:
            format = ".mp3";
            download = ytdl.downloadFromInfo(info, {filter: 'audioonly'});
            path = "./temp/";
            break;
    }

    const WriteStream = fs.createWriteStream(path + videotitle + format);
    download.pipe(WriteStream);
}

module.exports = downloadFile;