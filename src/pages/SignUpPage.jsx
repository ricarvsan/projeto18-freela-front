import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useState } from "react"
import axios from "axios"
import { IMaskInput } from "react-imask"

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [cpf, setCpf] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const navigate = useNavigate();


    function signUp(e) {
        e.preventDefault();

        if (password === passwordConfirm) {
            axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, { name, email, password, cpf, phonenumber })
                .then(() => navigate('/'))
                .catch(error => alert(error.response.data.message));
        } else {
            alert('As senhas precisam ser iguais!')
        }
        //console.log(cpf, cpf.length, phonenumber, phonenumber.length);
    }

    return (
        <SingUpContainer>
            <form onSubmit={signUp}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" type="text" required />
                <IMaskInput mask='000.000.000-00' title="\d{3}\.\d{3}\.\d{3}-\d{2}" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="CPF " type="text" required />
                <IMaskInput mask='(00) 00000-0000' value={phonenumber} onChange={e => setPhonenumber(e.target.value)} placeholder="Telefone" type="text" required />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" type="email" required />
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" type="password" autoComplete="new-password" required />
                <input value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder="Confirme a senha" type="password" autoComplete="new-password" required />
                <button type="submit">Cadastrar</button>
            </form>

            <Link to='/'>
                Já tem uma conta? Entre agora!
            </Link>
        </SingUpContainer>
    )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`