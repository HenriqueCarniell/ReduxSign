import './formlogin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//redux
import { useDispatch, useSelector } from 'react-redux';
import {LoginUser} from '../redux/user/action';

//bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FormLogin() {

    const [saveEmail, setEmail] = useState<string>('')
    const [saveSenha, setSenha] = useState<string>('')

    const dispatch = useDispatch()

    let HandleSaveEmail = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }

    let HandleSaveSenha = (e: ChangeEvent<HTMLInputElement>): void => {
        setSenha(e.target.value)
    }

    const {currentUser} = useSelector((state: { userReducer: any, currentUser: null | string}) => state.userReducer);

    console.log(currentUser);

    let nav = useNavigate();

    let HandleSendLoginData = async () => {
        try {
            let response = await axios.post('http://localhost:4000/send/login/dados', {
                EmailLogin: saveEmail,
                PasswordLogin: saveSenha,
            });

            if (response.data.token) {
                nav("/Home");
            } else {
                nav("/login")
            }

            dispatch(LoginUser(response.data.user));

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