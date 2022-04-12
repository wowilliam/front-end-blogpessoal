import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { busca, buscaId, post, put } from '../../../services/Service';
import './CadastroPostagem.css';
import Tema from '../../../models/Tema';
import Postagem from '../../../models/Postagem';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function CadastroPostagem() {

        let history = useHistory();

        const { id } = useParams<{ id: string }>();
    

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

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ""
    })

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: "",
        texto: "",
        tema: null
    })

       useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

       useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await busca("/temas/all", setTemas, {
            headers: { "Authorization": token }
        })
    }

    
    async function findByIdPostagem(id: string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: { "Authorization": token }
        })
    }

    
    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            try {
                await put(`/postagens`, postagem, setPostagem, {
                    headers: { "Authorization": token }
                })
                toast.success("Postagem atualizada com sucesso.", {
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
                await post(`/postagens`, postagem, setPostagem, {
                    headers: { "Authorization": token }
                })
                toast.success("Postagem cadastrada com sucesso.", {
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
        }
        back()
    }

    function back() {
        history.push('/posts')
    }


    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>
                <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="texto" name="texto" variant="outlined" margin="normal" fullWidth />

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            temas.map(tema => (
                                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}
export default CadastroPostagem;