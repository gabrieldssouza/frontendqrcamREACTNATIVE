const usuarioModel = require('../models/usuarioModel');

exports.registrar = async (req, res) => {
    try {
        const {nome, sobrenome, telefone, email, senha} = req.body;
        const resultado = await usuarioModel.registrarUsuario(nome, sobrenome, telefone, email, senha);
        res.status(200).send(resultado);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.logar = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await usuarioModel.logarUsuario(email, senha);
        res.status(200).json(usuario);
    } catch (erro) {
        res.status(401).send(erro);
    }
}

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.listarUsuarios();
        res.status(200).json(usuarios);
    } catch (erro) {
        res.status(500).send(erro);
    }
}