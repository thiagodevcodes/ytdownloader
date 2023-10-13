const path = require("path");
const express = require("express");
const admin = require("./routes/admin");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");

if(!fs.existsSync("./temp")) {
    const nomeDoDiretorio = "./temp"
    fs.mkdirSync(nomeDoDiretorio);
    console.log(`Diretório '${nomeDoDiretorio}' criado com sucesso.`);
};

//BODY PARSER

app.engine("handlebars", handlebars.engine({defaultLayout: "main", runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
}}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//ESTÁTICOS

app.use(express.static(path.join(__dirname, "static")));

//ROTAS
app.use("/", admin);

//CONFIG SERVER

const port = 8081
app.listen(port, () => {
    console.log("Servidor iniciado na porta 8081: http://localhost:8081");
});
