import axios from 'axios';
import React,{useEffect, useRef, useState} from 'react'
import styled from "styled-components"
import { reducerCases } from '../utils/Constants';
import { useStateProvider } from '../utils/StateProvider';
import Body from './Body';
import Footer from './Footer';
import Menu from './Menu';
import Navigation from './Navigation';

export default function Radyjko() {
    const [{token}, dispatch]= useStateProvider();
    const bodyRef = useRef();
    const [navBackground, setNavBackground] = useState(false);
    const [headerBackground, setHeaderBackground] = useState(false);
    const bodyScrolled = () => {
        bodyRef.current.scrollTop >= 30 ?setNavBackground(true) :setNavBackground(false);
        bodyRef.current.scrollTop >= 268 ?setHeaderBackground(true) :setHeaderBackground(false);
    }
    useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
        
        const userInfo ={
            userId: data.id,
            userName: data.display_name,
        } ;
        dispatch({ type: reducerCases.SET_USER, userInfo});
    };
    getUserInfo();
        
    }, [dispatch, token]);
    
 return <Container>
    <div className="radyjko__body">
        <Menu />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
            <Navigation navBackground={navBackground}/>
            <div className="body__contents">
                <Body headerBackground={headerBackground}/>
            </div>
        </div>
    </div>
    <div className="radyjko__footer">
        <Footer />
    </div>
  </Container>
}


const Container = styled.div`
max-width: 100vw;
max-height: 100vh;
overflow: hidden;
display: grid;
grid-template-rows: 85vh 15vh;
.radyjko__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width:100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32,87,100);
    .body {
        height: 100%;
        width: 100%;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0.7rem;
            max-height: 2rem;
            &-thumb {
                background-color: rgba(255, 255, 255, 0.6);
            }
        }
    }
}



`;