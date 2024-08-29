const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'senhaSecreta';

async function registrarUsuario(nome, sobrenome, telefone, email, senha) {
    const pessoaValues = [nome, sobrenome, telefone];
    const hashedSenha = await bcrypt.hash(senha, 10);
    const usuarioValues = [email, hashedSenha];
    const pessoaSql = `INSERT INTO pessoa (nome, sobrenome, telefone) VALUES (?, ?, ?)`;
    const usuarioSql = `INSERT INTO usuario (email, senha, pessoa_idPessoa) VALUES (?, ?, LAST_INSERT_ID())`;

    return new Promise((resolve, reject) => {
        db.query(pessoaSql, pessoaValues, (err) => {
            if (err) {
                return db.rollback(() => {
                    console.log(err);
                    reject('Erro ao cadastrar pessoa');
                });
            }

            db.query(usuarioSql, usuarioValues, (err) => {
                if (err) {
                    return db.rollback(() => {
                        console.log(err);
                        reject('Erro ao cadastrar usuário');
                    });
                }

                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            console.log(err);
                            reject('Erro ao confirmar transação');
                        });
                    }

                    console.log('Usuário registrado com sucesso');
                    resolve('Usuário registrado com sucesso');
                });
            });
        });
    });
};

async function logarUsuario(email, senha) {
    const usuarioSql = `SELECT * FROM usuario WHERE email = ?`;
    const usuarioValues = [email];

    return new Promise((resolve, reject) => {
        db.query(usuarioSql, usuarioValues, async (err, results) => {
            if (err) {
                console.log(err);
                return reject('Erro ao logar usuário');
            }

            if (results.length > 0) {
                const usuario = results[0];
                const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

                if (senhaCorreta) {
                    const token = jwt.sign({ id: usuario.idUsuario, email: usuario.email }, secretKey, {
                        expiresIn: '1h',
                    });
                    resolve({ token, usuario });
                } else {
                    reject('Usuário ou senha incorretos');
                }
            } else {
                reject('Usuário ou senha incorretos');
            }
        });
    });
}

async function listarUsuarios() {
    const usuarioSql = `SELECT * FROM usuario`;

    return new Promise((resolve, reject) => {
        db.query(usuarioSql, (err, results) => {
            if (err) {
                console.log(err);
                reject('Erro ao listar usuários');
            }

            resolve(results);
        });
    });
}

module.exports = { registrarUsuario, listarUsuarios, logarUsuario };
