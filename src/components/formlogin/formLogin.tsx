import './formlogin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//redux
import { useDispatch, useSelector } from 'react-redux';
import {LoginUser} from '../redux/user/action';

//bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';


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

    let HandleSendLoginData = async () => {
        try {
            let response = await axios.post('http://localhost:4000/send/login/dados', {
                EmailLogin: saveEmail,
                PasswordLogin: saveSenha,
            });

            localStorage.setItem("@rocketnotes:user", JSON.stringify(response.data.user))
            localStorage.setItem("@rocketnotes:token", response.data.token)

            dispatch(LoginUser(response.data.user));
        } catch (err) {
            console.log(err);
        }

        useEffect(() => {
            const token = localStorage.getItem("@rocketnotes:token")
            const user = localStorage.getItem("@rocketnotes:user")
    
            if(token && user) {
                axios.defaults.headers.authorization = `Bearer ${token}`
            }
        },[])
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
