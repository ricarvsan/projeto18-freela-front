import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export default function SignInPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function signIn(e) {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_API_URL}/`, { email, password })
            .then(resp => {
                let newUser = resp.data;
                setToken(resp.data.token);
                console.log(newUser)
                setUser(newUser)

                navigate('/home')
            })
            .catch(error => alert(error.response.data.message));
    }

    return (
        <SignInContainer>
            <form onSubmit={signIn}>
                <input data-test='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" type="email" required />
                <input data-test='password' value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" type="password" autoComplete="new-password" required />
                <button data-test='sign-in-submit' type="submit">Entrar</button>
            </form>

            <Link to='/cadastro'>
                Primeira vez? Cadastre-se!
            </Link>
        </SignInContainer>
    );
}

const SignInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  link {
    color: red;
  }
`