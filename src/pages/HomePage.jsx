import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [miaudelos, setMiaudelos] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }
    
    function navi(id) {
        navigate(`/miau/${id}`);
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/home`, config)
            .then(resp => setMiaudelos(resp.data))
            .catch(error => alert(error.response.data.message))
    }, []
    );



    return (
        <HomePageContainer>
            <Link to='/novo-miau'>
                Cadastrar miau!
            </Link>
            <Miaudelos>
                {miaudelos.map(miau => (
                    miau ? <Miau  key={miau.id} name={miau.name} url={miau.url} navi={() => navi(miau.id)} /> : null
                ))}
                
            </Miaudelos>
        </HomePageContainer>
    );
}

const HomePageContainer = styled.section`
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
    background-color: #EBC78E;
    text-align: center;
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
        <Miaudelo onClick={() => props.navi()}>
            <img src={props.url} alt={props.name} />
            <h1>{props.name}</h1>
        </Miaudelo>
    );
}