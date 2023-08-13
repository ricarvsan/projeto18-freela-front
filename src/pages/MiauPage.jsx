import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MiauPage() {
    const {id} = useParams();


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
    }, []
    );



    return (
        <MiauPageContainer>
            <Miaudelos>
                <Miau name={miau.name} url={miau.url} about={miau.about} tutor={miau.tutor} phonenumber={miau.phonenumber} />
            </Miaudelos>
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
`
const Miaudelo = styled.div`
    margin: 20px auto;
    max-width: 480px;
    width: 100%;
    border: 1px solid #222;
    border-radius: 9px;
    overflow: hidden;
    img {
        width: 100%;
    }
    h1 {
        font-size: 32px;
        font-weight: bold;
        margin: 20px;
        color: black;
    }
`

function Miau(props) {

    return (
        <Miaudelo >
            <img src={props.url} alt={props.name} />
            <h1>Miaudelo: {props.name}</h1>
            <h1>Sobre: {props.about}</h1>
            <h1>Tutor: {props.tutor}</h1>
            <h1>Contato: {props.phonenumber}</h1>
        </Miaudelo>
    );
}