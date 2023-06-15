const express = require('express')
const app = express()
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const Post = require('./models/Post').default
// Config
    //Template Engine
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    //Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
// Rotas

    app.get('/', (req, res) => {
        Post.findAll().then(function(posts){
            res.render('home', {posts: posts})
            console.log(posts[0])
        })
        
    })
    app.get('/cad', (req, res) => {
        res.render('formulario')
    })

    app.post('/add', (req, res) => {
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function(){
            res.redirect('/')
        }).catch(function(erro) {
            res.send('Houve um erro: ' + erro)
        })
    })

    app.listen(8081, () => {
        console.log('Servidor rodando na url http://localhost:8081');
    });
