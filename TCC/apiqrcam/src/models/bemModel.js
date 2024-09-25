const db = require('./db');

async function criarBem(nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria, local, qrcode) {
    const bemValues = [nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria, local, qrcode];
    const bemSql = `INSERT INTO bem (nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria, local, qrcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
        db.query(bemSql, bemValues, (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao cadastrar bem');
                return;
            }

            console.log('Bem cadastrado com sucesso');
            resolve(results.insertId);
        });
    });
}



async function adcionarBemLevantamento(bem_idbem, Levantamento_idLevantamento) {
    const values = [bem_idbem, Levantamento_idLevantamento];
    const bemSql = `INSERT INTO bem_has_Levantamento (bem_idbem, Levantamento_idLevantamento) VALUES (?, ?)`;

    return new Promise((resolve, reject) => {
        db.query(bemSql, values, (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao cadastrar bem levantamento');
                return;
            }

            console.log('id levantamento feito com sucesso ');
            resolve(results);
        });
    });
}


async function adcionarLevantamento(idLevantamento, data_hora, responsavel, ano) {
    const values = [idLevantamento, data_hora, responsavel, ano];
    const bemSql = `INSERT INTO levantamento (idLevantamento, data_hora, responsavel, ano) VALUES (?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
        db.query(bemSql, values, (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao cadastrar levantamento');
                return;
            }

            console.log('cadastrar levantamento feito com sucesso ');
            resolve(results);
        });
    });
}

async function listarLevantamento() {
    const bemSql = `SELECT * FROM levantamento`;
    return new Promise((resolve, reject) => {
        db.query(bemSql, (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao listar levantamentos');
            }

            resolve(results);
        });
    });
}


async function listarBensLevantamento() {
    const bemSql = `SELECT * FROM bem_has_levantamento`;
    return new Promise((resolve, reject) => {
        db.query(bemSql, (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao listar bens de levantamento');
            }

            resolve(results);
        });
    });
}

async function listarBens() {
    const bemSql = `SELECT * FROM bem`;

    return new Promise((resolve, reject) => {
        db.query(bemSql, (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao listar bens');
            }

            resolve(results);
        });
    });
}



async function listarLocais() {
    const bemSql = 'SELECT * FROM local';
    return new Promise((resolve, reject) => {
        db.query(bemSql, (err, results) => {
            if(err) {
                console.log(err);
                reject('Erro ao listar locais');
            }
            resolve(results);
        })
    });
}

async function listarCategorias(){
    const bemSql = 'SELECT * FROM categoria';

    return new Promise((resolve, reject) => {
        db.query(bemSql, (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao pegar categorias');
            }
            resolve(results);
        });
    });
}

async function listarBensDeCategoria(idCategoria) {
    const bemSql = 'SELECT * FROM bem WHERE categoria_idCategoria = ?';

    return new Promise((resolve, reject) => {
        db.query(bemSql, [idCategoria], (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao listar bem de Categoria');
            }
            resolve(results);
        });
    });
}

async function listarBensDeLocais(idlocal) {
    const bemSql = 'SELECT * FROM bem WHERE local_idLocais = ?';

    return new Promise((resolve, reject) => {
        db.query(bemSql, [idlocal], (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao listar bem de local');
            }
            resolve(results);
        });
    });
}

async function listarBemDeEstado(nameEstado) {
    const bemSql = 'SELECT * FROM bem WHERE estado_conservacao = ?';

    return new Promise((resolve, reject) => {
        db.query(bemSql, [nameEstado], (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao pegar bens bem');
            }
            resolve(results);

        });
    });
}

async function editarBem(idbem, nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria, local_idLocais, responsavelMovimento, local) {
    const bemValues = [nome, codigo, numero, estado_conservacao, valor_aquisicao, data_aquisicao, categoria_idCategoria, local, idbem];
    const movimentoValues = [new Date(), responsavelMovimento, local_idLocais, idbem];
    const bemSql = `UPDATE bem SET nome = ?, codigo = ?, numero = ?, estado_conservacao = ?, valor_aquisicao = ?, data_aquisicao = ?, categoria_idCategoria = ?, local = ? WHERE idbem = ?`;
    const movimentoSql = `INSERT INTO movimento (data_hora_movimento, responsável_movimento, local_idLocais, bem_idbem) VALUES (?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
        db.query(bemSql, bemValues, (err) => {
            if (err) {
                console.log(err);
                reject('Erro ao editar bem');
                return;
            }

            console.log('Bem editado com sucesso');
            db.query(movimentoSql, movimentoValues, (err) => {
                if (err) {
                    console.log(err);
                    reject('Erro ao registrar movimento');
                    return;
                }

                console.log('Movimento registrado com sucesso');
                resolve('Bem e movimento registrados com sucesso');
            });
        });
    });
}


async function listarBem(idbem) {
    const bemSql = `SELECT * FROM bem WHERE idbem = ?`;

    return new Promise((resolve, reject) => {
        db.query(bemSql, [idbem], (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao listar bem');
            }

            resolve(results[0]);
        });
    });
}

async function atualizarQrCode(idbem, qrcode) {
    const bemSql = `UPDATE bem SET qrcode = ? WHERE idbem = ?`;

    return new Promise((resolve, reject) => {
        db.query(bemSql, [qrcode, idbem], (err) => {
            if (err) {
                console.log(err);
                reject('Erro ao atualizar QR code');
                return;
            }

            console.log('QR code atualizado com sucesso');
            resolve();
        });
    });
}

module.exports = { criarBem, listarBens, editarBem, listarBem, atualizarQrCode, listarBemDeEstado,
     listarBensDeLocais, listarBensDeCategoria, listarCategorias, listarLocais, adcionarBemLevantamento, 
     listarBensLevantamento, adcionarLevantamento, listarLevantamento};