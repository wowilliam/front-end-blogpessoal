import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import Tema from '../../../models/Tema'
import './ListaTema.css';
import { useSelector } from 'react-redux';
import { busca } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaTema() {
    let history = useHistory();

       const [temas, setTemas] = useState<Tema[]>([])

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

       async function getTemas() {
        await busca(`/temas/all`, setTemas, {
            headers: { "Authorization": token }
            
        })
    }

       useEffect(() => {
        getTemas()
    }, [temas.length])
    
    return (
        <>
        {    temas.map(tema => (
            <Box m={2} >
                <Card variant="outlined">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Tema
                        </Typography>
                        <Typography variant="h5" component="h2">
                          {tema.descricao}
                        </Typography>                    
                   </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="center" mb={1.5} >

                            <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                            <Box mx={1}>
                             <Button variant="contained" className="marginLeft" size='small' color="primary" >
                                 atualizar
                            </Button>
                            </Box>
                            </Link>
                            <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
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

export default ListaTema;