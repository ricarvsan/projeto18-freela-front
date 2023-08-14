import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function MiauPage() {
    const { id } = useParams();


    const [miau, setMiau] = useState([]);
    const { user } = useContext(UserContext);

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/miau/${id}`, config)
            .then(resp => setMiau(resp.data))
            .catch(error => alert(error.response.data.message))
    }, [miau]
    );

    function updateStatus() {
        axios.post(`${import.meta.env.VITE_API_URL}/miau/${id}`, {active: miau.active}, config)
            .then(resp => setMiau(resp.data))
            .catch(error => alert(error.response.data.message))
    }



    return (
        <MiauPageContainer>
            <Miaudelos>
                {(user.id === miau.userId) ? <h1>Status: {miau.active ? 'Ativo' : 'De férias'}</h1> : null}
                <Miau name={miau.name} url={miau.url} about={miau.about} tutor={miau.tutor} phonenumber={miau.phonenumber} />
                {(user.id === miau.userId) ? <button onClick={() => updateStatus()}>Desativar/Ativar Miaudelo</button> : null}
            </Miaudelos>

            <Link to='/home'>Voltar</Link>

            
        </MiauPageContainer>
    );
}

const MiauPageContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`
const Miaudelos = styled.div`
    min-height: calc(100vh - 120px);
    h1 {
        background-color: #EBC78E;
        border: 1px solid #222;
        border-radius: 5px;
        text-align: center;        
        color: black;
    }
    
`
const Miaudelo = styled.div`
    margin: 20px auto;
    max-width: 480px;
    width: 100%;
    border: 1px solid #222;
    border-radius: 9px;
    overflow: hidden;
    background-color: #EBC78E;
    img {
        width: 100%;
    }
    h1 {
        font-size: 32px;
        font-weight: bold;
        margin: 20px;
        color: black;
    }
    h2 {
        font-size: 18px;
        font-weight: bold;
        margin: 20px;
        color: black;
    }
`

function Miau(props) {

    return (
        <Miaudelo >
            <img src={props.url} alt={props.name} />
            <h2>Miaudelo: {props.name}</h2>
            <h2>Sobre: {props.about}</h2>
            <h2>Tutor: {props.tutor}</h2>
            <h2>Contato: {props.phonenumber}</h2>
        </Miaudelo>
    );
}