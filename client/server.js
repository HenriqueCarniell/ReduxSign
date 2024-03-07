const express = require('express');
const app = express()
const cors = require('cors');
const porta = 4000;
const db = require('./db');
const jwt = require('jsonwebtoken');
const auth = require('./auth');

// Confings
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//API
app.post('/send/create/dados', (req, res) => {
    const { EmailCreate, PasswordCreate } = req.body

    if (!EmailCreate || !PasswordCreate) {
        res.json({ msg: "Digite um email ou senha" })
    }

    console.log(EmailCreate, PasswordCreate)

    verifyEmail(EmailCreate, res, PasswordCreate)
})

let verifyEmail = (Email, res, senha) => {
    return new Promise((resolve, reject) => {

        const sql = "select * from Usuario where email = ?";

        db.query(sql, [Email], async (err, result) => {
            if (err) {
                console.log(err)
                res.json({ msg: "Erro interno do servidor" })
                reject(err)
            }

            if (result.length > 0) {
                res.status(202).json({ msg: "Email já existe" })
            } else {
                resolve(insertIntoDatabase(Email, senha, res))
            }
        })
    })
}

let insertIntoDatabase = (email, senha, res) => {
    const sql = "insert into Usuario(email, senha) values(?,?)"

    db.query(sql, [email, senha], async (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json({ msg: "dados cadastrados com sucesso" })
            console.log(result)
        }
    })
}

app.post('/send/login/dados', async (req, res) => {
    const { EmailLogin, PasswordLogin } = req.body

    if (!EmailLogin || !PasswordLogin) {
        return res.json({ msg: "Digite um email ou senha" })
    }

    let user = await checkDataDatabase(EmailLogin, PasswordLogin, res)

    if(user) {
        const {secret, expiresIn} = auth.jwt;

        const token = jwt.sign({}, secret, {
            subject: String(user.idusuario),
            expiresIn
        })

        res.json({user, token})
    }
})


let checkDataDatabase = (EmailLogin, PasswordLogin, res) => {
    return new Promise((resolve, reject) => {
        const sql = "select * from Usuario where email = ? and senha = ?";

        db.query(sql, [EmailLogin, PasswordLogin], (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }

            if (result.length > 0) {
                resolve(result[0])
            } else {
                res.json({msg: "usuario não existe"})
            }
        })
    })

}

app.listen(porta, () => {
    console.log(`O servidor esta rodando na ${porta}`);
})