import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service';
import './ListaPostagem.css';
import { toast } from 'react-toastify';


function ListaPostagem() {

    let history = useHistory()
  
    const [posts, setPost] = useState<Postagem[]>([])
  
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
  
    async function getPost() {
      await busca("/postagens", setPost, {
        headers: {
          'Authorization': token
        }
      })
    }
  
    useEffect(() => {
        getPost()
      }, [posts.length])

    return (
        <>
        {    posts.map(posts => (
            <Box m={2} >
                <Card variant="outlined">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Postagens
                        </Typography>
                        <Typography variant="h5" component="h2">
                          {posts.titulo}
                        </Typography>
                        <Typography variant="body2" component="p">
                          {posts.texto}
                        </Typography>
                        <Typography variant="body2" component="p">
                          {posts.tema?.descricao}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="center" mb={1.5}>

                            <Link to={`/formularioPostagem/${posts.id}`} className="text-decorator-none" >
                                <Box mx={1}>
                                    <Button variant="contained" className="marginLeft" size='small' color="primary" >
                                        atualizar
                                    </Button>
                                </Box>
                            </Link>
                            <Link to={`/deletarPostagem/${posts.id}`} className="text-decorator-none">
                                <Box mx={1}>
                                    <Button variant="contained" size='small' color="secondary">
                                        deletar
                                    </Button>
                                </Box>
                            </Link>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
            ))
        }
        </>
    );
}

export default ListaPostagem;