import React, { useEffect, useState } from 'react'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { buscaId, deleteId } from '../../../services/Service';
import './DeletarTema.css';
import Tema from '../../../models/Tema';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify'


function DeletarTema() {

    let history = useHistory();

    const { id } = useParams<{ id: string }>();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )

    const [tema, setTema] = useState<Tema>()

    
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

   
    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

        async function findById(id: string) {
        buscaId(`/temas/${id}`, setTema, {
            headers: { "Authorization": token }
        })
    }

    
    function sim() {
        history.push("/temas")
        try {
            deleteId(`/temas/${id}`, {
                headers: { "Authorization": token }
            });
            toast.success("Tema deletado com sucesso.", {
                position: "top-right", //posição do alerta
                autoClose: 2000, //tempo da notificação na tela
                hideProgressBar: false, //se aparece barra de progresso
                closeOnClick: true, //se aparece o X para fechar a notificação
                pauseOnHover: true, //se passar o mouse em cima, o tempo para fechar congela
                draggable: false, //se pode mover a notificação de local
                theme: "colored", // visual
                progress: undefined,
            });
        } catch (error) {
            console.log(`Error: ${error}`)
            toast.error("Erro ao deletar tema.", {
                position: "top-right", //posição do alerta
                autoClose: 2000, //tempo da notificação na tela
                hideProgressBar: false, //se aparece barra de progresso
                closeOnClick: true, //se aparece o X para fechar a notificação
                pauseOnHover: true, //se passar o mouse em cima, o tempo para fechar congela
                draggable: false, //se pode mover a notificação de local
                theme: "colored", // visual
                progress: undefined,
            });
        }

    }
    
    function nao() {
        history.push("/temas")
    }

    return (
        <>
            <Box m={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar o Tema:
                            </Typography>
                            <Typography color="textSecondary">
                                {tema?.descricao}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                            <Box mx={2}>
                                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                                    Sim
                                </Button>
                            </Box>
                            <Box mx={2}>
                                <Button onClick={nao} variant="contained" size='large' color="secondary">
                                    Não
                                </Button>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}
export default DeletarTema;