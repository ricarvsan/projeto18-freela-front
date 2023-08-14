import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useContext, useState } from "react"
import axios from "axios"
import { IMaskInput } from "react-imask"
import { UserContext } from "../contexts/UserContext"

export default function NewMiauPage() {
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [mainPhoto, setMainPhoto] = useState('');
    const [photos, setPhotos] = useState([]);
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }


    function NewMiau(e) {
        e.preventDefault();


        axios.post(`${import.meta.env.VITE_API_URL}/novo-miau`, { name, about, mainPhoto }, config)
            .then(() => (navigate('/home')))
            .catch(error => alert(error.response.data.message));

    }

    return (
        <NewMiauContainer>
            <h1>Novo Miaudelo</h1>
            <form onSubmit={NewMiau}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" type="text" required />
                <input value={mainPhoto} onChange={e => setMainPhoto(e.target.value)} placeholder="Url foto principal" type="url" required />
                <input value={about} onChange={e => setAbout(e.target.value)} placeholder="Sobre" type="text" required />
                <button type="submit">Cadastrar</button>
            </form>

            <Link to='/home'>Voltar</Link>
        </NewMiauContainer>
    )
}

const NewMiauContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin-bottom: 20px;
    color: black;
    background-color: #EBC78E;
    border-radius: 5px;
    padding: 5px;
    border: 1px solid;
  }
  button {
    color: black;
  }
`