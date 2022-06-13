const path = require("path");
const express = require("express");
const admin = require("./routes/admin");
const app = express();
const bodyParser = require("body-parser");


//BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//ESTÁTICOS
app.use(express.static(path.join(__dirname, "static")));

//ROTAS
app.use("/", admin)

//CONFIG SERVER

const port = 8081
app.listen(port, () => {
    console.log("Servidor iniciado na porta 8081: http://localhost:8081");
});
