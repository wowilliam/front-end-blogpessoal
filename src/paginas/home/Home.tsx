import React, { useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import TabPostagem from '../../components/postagens/tabpostagem/TabPostagem';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import "./Home.css";


function Home(){

    let history = useHistory();

    const token = useSelector<TokenState, TokenState["tokens"]>(
      (state) => state.tokens
    )
  
    useEffect(() => {
      if (token === "") {
        toast.error("Você precisa estar logado.", {
          position: "top-right", //posição do alerta
          autoClose: 2000, //tempo da notificação na tela
          hideProgressBar: false, //se aparece barra de progresso
          closeOnClick: true, //se aparece o X para fechar a notificação
          pauseOnHover: true, //se passar o mouse em cima, o tempo para fechar congela
          draggable: false, //se pode mover a notificação de local
          theme: "colored", // visual
          progress: undefined, 
      });
        history.push("/login")
      }
    }, [token])
  
    return(
        <>
        <Grid container direction="row" justifyContent="center" alignItems="center" className="caixa">
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={20} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className="titulo">Seja bem vindo(a)!</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className="titulo">expresse aqui os seus pensamentos e opiniões!</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                            <ModalPostagem />
                        </Box>
                        <Link to="/posts" className="text-decorator-none">
                        <Button variant="outlined" className="botao">Ver Postagens</Button>
                        </Link>
                    </Box>
                </Grid>                
                <Grid item xs={6}>
                  <img src="https://i.imgur.com/KDZ0exd.png" alt="" width="500px" height="400px" />
                    
                </Grid>
                <Grid xs={12} className="postagens">
                <TabPostagem />
                </Grid>
            </Grid>

        </>
    ); 
}

export default Home;