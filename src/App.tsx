import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container } from "@mui/material";
import CreatureList from "./components/CreatureList";

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
    typography: {
        fontFamily: "Lora",
        fontSize: 24,
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xl" sx={{ padding: theme.spacing(4) }}>
                <CreatureList></CreatureList>
            </Container>
        </ThemeProvider>
    );
};

export default App;
