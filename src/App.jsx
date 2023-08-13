import { BrowserRouter, Routes, Route } from "react-router-dom"
import { styled } from "styled-components"
import { UserContext } from "./contexts/UserContext"
import { useState } from "react"
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import MiauPage from "./pages/MiauPage";
import NewMiauPage from "./pages/NewMiauPage";

export default function App() {

  const [user, setUser] = useState({});

  return (

    <PagesContainer>
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path='/' element={<SignInPage />} />
            <Route path='/cadastro' element={<SignUpPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/miau/:id' element={<MiauPage />} />
            <Route path='/novo-miau' element={<NewMiauPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </PagesContainer>

  )
}

const PagesContainer = styled.main`
  width: calc(100vw - 50px);
  //max-height: 100vh;
  height: 100%;
  padding: 25px;
  background-image: url('../src/assets/catback.png');
  background-repeat: repeat;
`