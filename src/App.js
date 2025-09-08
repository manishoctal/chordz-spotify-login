import React, { useState } from "react";
import "./App.css";
import { AuthContext } from "./contexts/AuthContext";
import Layout from './ui/Layout'
import { CookiesProvider } from "react-cookie";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Theme from './ui/Themes/Theme.ts'

function App() {


    const [profile,setProfile]=useState()


    return (
        <CookiesProvider>
            <AuthContext.Provider value={[profile,setProfile]}>
                <ThemeProvider theme={Theme}>
                    <Layout />
                </ThemeProvider>
            </AuthContext.Provider>
        </CookiesProvider>
    );
}
export default App;
