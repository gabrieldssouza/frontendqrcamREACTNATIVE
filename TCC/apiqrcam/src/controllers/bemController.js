const bemModel = require('../models/bemModel');
const QRCode = require('qrcode');

exports.criarBem = async (req, res) => {
  const { nome, numero, codigo, data_aquisicao, valor_aquisicao, estado_conservacao, categoria_idCategoria, local } = req.body;

  try {
    const idbem = await bemModel.criarBem(nome, numero, codigo, data_aquisicao, valor_aquisicao, estado_conservacao, categoria_idCategoria, local);

    let newData = {
      idbem,
      nome,
      numero,
      codigo,
      data_aquisicao,
      valor_aquisicao,
      estado_conservacao,
      categoria_idCategoria,
      local
    };

    const qrcode = await QRCode.toDataURL(JSON.stringify(newData));

    // Update the item with the generated QR code
    await bemModel.atualizarQrCode(idbem, qrcode);

    res.status(201).json({ message: 'Bem criado com sucesso', qrcode: qrcode, idbem: idbem });
  } catch (error) {
    console.error('Erro ao gerar QR code:', error);
    res.status(500).json({ message: 'Erro ao gerar QR code' });
  }
};

exports.listarBens = async (req, res) => {
    try {
        const bens = await bemModel.listarBens();
        res.status(200).json(bens);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.listarBem = async (req, res) => {
    try {
        const { idbem } = req.params;
        const bem = await bemModel.listarBem(idbem);
        res.status(200).json(bem);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.editarBem = async (req, res) => {
    try {
        const { idbem, nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria, local_idLocais, responsavelMovimento, local } = req.body;
        const resultado = await bemModel.editarBem(idbem, nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria, local_idLocais, responsavelMovimento, local);
        res.status(200).send(resultado);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.listarCategorias = async (req, res) => {
    try {
        const categorias = await bemModel.listarCategorias();
        res.status(200).json(categorias);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.listarLocais = async (req, res) => {
    try{
        const locais = await bemModel.listarLocais();
        res.status(200).json(locais);
    } catch (erro) {
        res.status(500).send(erro);
        console.log(erro)
    }
}


exports.listarBensDeCategoria = async (req, res) => {
    try {
        const { idCategoria } = req.params;
        const BensDeCategoria = await bemModel.listarBensDeCategoria(idCategoria);
        res.status(200).json(BensDeCategoria);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.listarBensDeLocal = async (req, res) => {
    try {
        const { idLocal } = req.params;
        const BensDeLocal = await bemModel.listarBensDeLocal(idLocal);
        res.status(200).json(BensDeLocal);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

exports.listarBemDeEstado = async (req, res) => {
    try {
        const { nameEstado } = req.params;
        const BensDeEstado = await bemModel.listarBemDeEstado(nameEstado);
        res.status(200).json(BensDeEstado);
    } catch (erro) {
        res.status(500).send(erro);
    }
}