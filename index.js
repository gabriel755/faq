const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Importação de db e tabelas
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
// Data base
connection.authenticate()
    .then(() => {
        console.log('Conexão efetuada!')
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

//Usar EJS como view engine.
app.set('view engine','ejs');
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas
app.get("/",(req, res) => {
    Pergunta.findAll({raw:true, order:[
        ['id','DESC']
    ]}).then((perguntas => {
        res.render("index",{
            perguntas: perguntas,
        })
    }));

    
})

app.get("/perguntar",(req, res) => {
    res.render("perguntar");
})


app.post("/salvarpergunta",(req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var empresa = req.body.empresa;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao,
        empresa: empresa
    }).then(() => {
        res.redirect("/");
    })
})

app.get("/pergunta/:id",(req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){

            Resposta.findAll({
                where: {pergunta_id: pergunta.id},
                order: [
                    ['id','DESC']
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            })           
        }else{
            res.redirect("/");
        }
    })
})

app.post("/responder",(req,res) => {
    var corpo = req.body.corpo;
    var pergunta_id = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        pergunta_id: pergunta_id
    }).then(() => {
        res.redirect("/pergunta/" + pergunta_id)
    })
});

app.listen(8000, () => {
    console.log("Server is been started!");

});
