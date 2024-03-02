
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';

function FormCreateAccount() {

    const [saveEmail, setEmail] = useState<string>('')
    const [saveSenha, setSenha] = useState<string>('')

    let HandleSaveEmail = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }

    let HandleSaveSenha = (e: ChangeEvent<HTMLInputElement>): void => {
        setSenha(e.target.value)
    }

    let HandleSendLoginData = () => {
        try {
            let response = axios.post('http://localhost:4000/send/create/dados', {
                EmailCreate: saveEmail,
                PasswordCreate: saveSenha,
            })
                .then(response => {
                    console.log(response, + 'front')
                })
            console.log(response, + 'front')
        } catch (err) {
            console.log(err, + 'front')
        }

    }

    return (
        <div id="ContainerLogin">
            <Form>
                <div className='d-flex justify-content-center'>
                    <h1>Criar Conta</h1>
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={HandleSaveEmail} />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha: </Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={HandleSaveSenha} />
                </Form.Group>
                <Form.Text className="text-muted">
                    <p>Possui uma conta ? <a href="/login">Faça login</a></p>
                </Form.Text>
                <Button variant="primary" onClick={HandleSendLoginData}>
                    Enviar
                </Button>
            </Form>
        </div>
    );
}

export default FormCreateAccount;