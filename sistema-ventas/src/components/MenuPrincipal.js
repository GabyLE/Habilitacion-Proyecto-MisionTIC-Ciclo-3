import React, { useState } from 'react';
import { IconButton, Box, Drawer, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import ModalLogin from './login/ModalLogin';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { theme, obtenerUsuarioLogueado } from '../services/Global';

// ICONS
import ReceiptIcon from '@mui/icons-material/Receipt';
import HomeIcon from '@mui/icons-material/Home';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

//LOGIN
//import { useAuth0 } from "@auth0/auth0-react";



const obtenerEstilos = makeStyles(
    (tema) => ({
        botonMenu: {
            marginRight: tema.spacing(2),
        },
        titulo: {
            flexGrow: 1,
        }
    })
);


const MenuPrincipal = () => {

    const estilos = obtenerEstilos();

    // Manejo del estado de usuario logueado
    const [usuarioLogueado, setUsuarioLogueado] = useState(obtenerUsuarioLogueado);

    //const { isAuthenticated, logout, loginWithRedirect, user } = useAuth0();
    // const { logout } = useAuth0();
    // const { loginWithRedirect } = useAuth0();
    // const { user, isAuthenticated, isLoading } = useAuth0();

    //Manejo del estodo de la ventana modal
    const [estadoModal, setEstadoModal] = useState(false);
    //rutina que abre la ventana modal
    const abrirModal = () => {
        setEstadoModal(true);
    }

    // rutina que cierra la ventana modal
    const cerraModal = () => {
        setEstadoModal(false);
        setUsuarioLogueado(obtenerUsuarioLogueado);
    }

    // Manejo del estado del menú
    const [estadoMenu, setEstadoMenu] = useState(false);
    const [idRol, setIdRol] = useState('');

    // rutina que desactiva el despliegue del menú
    const mostrarMenu = (estado) => () => {
        setEstadoMenu(estado);
    }

    // rutina que realiza la salida del usuario
    const salir = () => {
        sessionStorage.removeItem("usuarioLogueado");
        setUsuarioLogueado(obtenerUsuarioLogueado);
    }

    const menuAdmin = () => (

        <Box
            sx={{ width: 300 }}
            role="presentation"
            onClick={mostrarMenu(false)}
        >

            <List subheader={<ListSubheader>Navegación</ListSubheader>}>
                <ListItem disablePadding>
                    <ListItemButton component="a" href={"/Home"}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href={"/Ventas"}>
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ventas" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href={"/Productos"}>
                        <ListItemIcon>
                            <StoreMallDirectoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Productos" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component="a" href={"/Usuarios"}>
                        <ListItemIcon>
                            <PeopleAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Usuarios" />
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    )


    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" color="secondary">

                <Toolbar>
                    {usuarioLogueado ? (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria_label="Menu Principal"
                            className={estilos.botonMenu}
                            onClick={mostrarMenu(true)}

                        >
                            <MenuIcon />
                        </IconButton>
                    ) : ''}
                    <Typography variant="h6" className={estilos.titulo}>
                        Librería BookDragon
                    </Typography>
                    <span sx={{ m: 0.5 }}>
                        {usuarioLogueado ? usuarioLogueado.nombre : ""}
                    </span>
                    {usuarioLogueado ? (
                        <Button variant="contained" onClick={salir} sx={{ m: 0.5 }} href={"/"} >
                            Salir
                        </Button>
                    ) : (

                        <Button variant="contained" onClick={abrirModal} sx={{ m: 0.5 }}>
                            Iniciar Sesión
                        </Button>
                    )}
                </Toolbar>
                <ModalLogin open={estadoModal} cerrar={cerraModal} />
                <Drawer
                    anchor="left"
                    open={estadoMenu}
                    onClose={mostrarMenu(false)}
                >
                    {menuAdmin()}
                </Drawer>

            </AppBar>
        </ThemeProvider>
    )
}

export default MenuPrincipal;