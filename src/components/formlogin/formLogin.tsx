
import 'bootstrap/dist/css/bootstrap.min.css';

import './formlogin.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FormLogin() {

    const [saveEmail, setEmail] = useState<string>('')
    const [saveSenha, setSenha] = useState<string>('')

    let HandleSaveEmail = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }

    let HandleSaveSenha = (e: ChangeEvent<HTMLInputElement>): void => {
        setSenha(e.target.value)
    }

    let nav = useNavigate()

    let HandleSendLoginData = async () => {
        try {
            let response = await axios.post('http://localhost:4000/send/login/dados', {
                EmailLogin: saveEmail,
                PasswordLogin: saveSenha,
            });
    
            if(response.data.msg !== "usuario não existe") {
                nav("/Home")
            }
            console.log(response.data.user)

            //colocar response.data.user no redux
        } catch (err) {
            console.log(err);
        }
    }
    

    return (
        <div id="ContainerLogin">
            <Form>
                <div className='d-flex justify-content-center'>
                    <h1>Login</h1>
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
                    <p>Não possui uma conta ? <a href="/createaccount">Criar conta</a></p>
                </Form.Text>
                <Button variant="primary" onClick={HandleSendLoginData}>
                    Enviar
                </Button>
            </Form>
        </div>
    );
}

export default FormLogin;