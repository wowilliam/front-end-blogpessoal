import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Navbar.css';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/action';
import { toast } from 'react-toastify';


function Navbar (){
    
    let history = useHistory()

    const dispatch = useDispatch()

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )

    function goLogout() {
        dispatch(addToken(''))
        toast.info("Usuário deslogado.", {
            position: "top-right", 
            autoClose: 2000, 
            hideProgressBar: false, 
            closeOnClick: true, 
            pauseOnHover: true, 
            draggable: false, 
            theme: "colored", 
            progress: undefined, 
        });

        history.push("/login")
    }

    var navBarComponent
if (token !== "") {

    navBarComponent = <AppBar position="static">
    <Toolbar variant="dense">
        <Box mx={1} className='cursor'>
            <Typography variant="h5" color="inherit">
                BitGert
            </Typography>
        </Box>

        <Box display="flex" justifyContent="start">
        <Link to='/home' className='text-decorator-none'>
            <Box mx={1} className='cursor'>
                <Typography variant="h6" color="inherit">
                    home
                </Typography>
            </Box>
        </Link>

        <Link to="/posts" className="text-decorator-none">
                <Box mx={1} className="cursor">
                    <Typography variant="h6" color="inherit">
                        postagens
                    </Typography>
                </Box>
            </Link>

            <Link to="/temas" className="text-decorator-none">
             <Box mx={1} className='cursor'>
                <Typography variant="h6" color="inherit">
                    temas
                </Typography>
            </Box>
            </Link>
            
            <Link to="/formularioTema" className="text-decorator-none">
            <Box mx={1} className='cursor'>
                <Typography variant="h6" color="inherit">
                    cadastrar tema
                </Typography>
            </Box>
            </Link>
                     
                <Box mx={1} className="cursor" onClick={goLogout}>
                    <Typography variant="h5" color="inherit">
                        logout
                    </Typography>
                </Box>
                                    
        </Box>

    </Toolbar>
</AppBar>
}
    return( 
        <>
          { navBarComponent }
      </>
    );
}

export default Navbar;