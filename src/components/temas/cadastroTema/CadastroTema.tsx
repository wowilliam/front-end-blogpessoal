import { Button, Container, TextField, Typography } from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Tema from '../../../models/Tema';
import { buscaId, post, put } from '../../../services/Service';
import './CadastroTema.css';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function CadastroTema() {
    let history = useHistory();

    
    const { id } = useParams<{ id: string }>();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )

    
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ""
    })

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

        function updatedTema(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value,
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("Tema " + JSON.stringify(tema))

       
        if (id !== undefined) {

            try {
                await put(`/temas`, tema, setTema, {
                    headers: { "Authorization": token }
                })
                toast.success("Tema atualizado com sucesso.", {
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
                toast.error("Erro ao atualizar! Por favor, verifique a quantidade mínima de caracteres.", {
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
        } else { 
            try {
                await post(`/temas`, tema, setTema, {
                    headers: { "Authorization": token }
                })
                toast.success("Tema cadastrado com sucesso.", {
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
                toast.error("Erro ao cadastrar! Por favor, verifique a quantidade mínima de caracteres.", {
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

        } back()
    }

    function back() {
        history.push("/temas")
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)}
                    id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    );
}

export default CadastroTema;