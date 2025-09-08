
import React, { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { AuthContext } from '../contexts/AuthContext';
import { loginAuthorizationCodeFlow } from '../utils/auth/authSpotify'
const pages = ['home', 'playlists', 'search', 'profile'];



const Layout = (props) => {
    const { logout, children } = props
    const login = () => loginAuthorizationCodeFlow(['user-modify-playback-state user-read-currently-playing user-read-playback-state user-read-private user-read-email'])
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [profile] = useContext(AuthContext);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    useEffect(() => {

        setTimeout(() => {
            if (!profile) {
                login()


            }
        }, 1000)

    }, [profile])



    return (
        <AppBar position="static">
            {/* <Container maxWidth={false} sx={{ backgroundColor: 'white' }}>
                <Toolbar disableGutters >

                    <Box sx={{ flexGrow: 1 }} >
                        {profile ?


                            <div className="" style={{
                                height: "100vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: 'black'

                            }}>
                                <div >

                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 1 }}
                                    >
                                        <Avatar
                                            alt={profile?.name}
                                            src={profile?.images?.[0]?.url}
                                        />

                                    </IconButton>
                                    <h3>{profile.display_name}</h3>
                                    <p>{profile.email}</p>


                                    <button

                                        onClick={() => { window.location = '/' }}
                                        key={pages.length + 1}
                                        variant='text'
                                        style={{ color: "white", backgroundColor: 'blue', border: 'none', padding: '10px 30px', borderRadius: '10px', cursor: 'pointer' }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div> :

                            <Box
                                sx={{
                                    height: "100vh",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",

                                }}
                            >
                                <button

                                    onClick={login}
                                    key={pages.length + 1}
                                    variant='text'
                                    style={{ color: "white", backgroundColor: 'blue', border: 'none', padding: '10px 30px', borderRadius: '10px', cursor: 'pointer' }}
                                >
                                    Login
                                </button>
                            </Box>
                        }
                    </Box>
                </Toolbar>
            </Container> */}
        </AppBar >
    );
};
export default Layout;
