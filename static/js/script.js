let link = document.getElementById("link-a");
let select = document.getElementById("tipo");
let button = document.getElementById("button");

let value = select.options[select.selectedIndex].value;

console.log(value);

if(value == "MP3") {
    link.href = "/cache/download.mp3";
} else {
    link.href = "/cache/download.mp4";
}





