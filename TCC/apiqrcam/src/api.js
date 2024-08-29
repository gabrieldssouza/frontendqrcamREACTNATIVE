const express = require('express');
const cors = require('cors');
const db = require('./models/db');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const router = express.Router();

app.use('/', router.get('/', (req, res) => {
    res.status(200).send('API online');
}));

app.use('/registrar', router.post('/registrar', async (req, res) => {
    const usuarioController = require('./controllers/usuarioController');
    await usuarioController.registrar(req, res);
}));

app.use('/logar', router.post('/logar', async (req, res) => {
    const usuarioController = require('./controllers/usuarioController');
    await usuarioController.logar(req, res);
}));

app.use('/usuarios', router.get('/usuarios', async (req, res) => {
    const usuarioController = require('./controllers/usuarioController');
    await usuarioController.listarUsuarios(req, res);
}));

app.use('/criarbem', router.post('/criarbem', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.criarBem(req, res);
}));

app.use('/listarBens', router.get('/listarBens', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarBens(req, res);
}));

app.use('/listarBem/:idbem', router.get('/listarBem/:idbem', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarBem(req, res);
}));

app.use('/editarBem', router.put('/editarBem', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.editarBem(req, res);
}));

app.use('/listarCategorias', router.get('/listarCategorias', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarCategorias(req, res);
}));

app.use('/listarCategoria/:idCategoria', router.get('/listarCategoria/:idCategoria', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarBensDeCategoria(req, res);
}));

app.use('/listarlocais', router.get('/listarlocais', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarLocais(req, res);
}));

app.use('/listarlocal/:idLocal', router.get('/listarlocal/:idLocal', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarBensDeLocal(req, res);
}));

app.use('/listarEstados/:nameEstado', router.get('/listarEstados/:nameEstado', async (req, res) => {
    const bemController = require('./controllers/bemController');
    await bemController.listarBemDeEstado(req, res);
}));

module.exports = app;

