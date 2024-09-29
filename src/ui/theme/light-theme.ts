import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            light: "#9661ff",
            main: "#6b2aee",
            dark: "#581ecd"
        },
        text: {
            primary: "#707070",
            secondary: "#9b9b9b",
        },
        error: {
            main:"#fc3c00"
        },
        warning: {
            main:"#fca600"
        },
        success: {
            main: "#00d34d"
        },
        grey: {
            50:"#fafafa",
            100:"#f0f0f0",
            200:"#d7d7d7",
            300:"#c4c4c4",
            400:"#9b9b9b"
        }
    },
    breakpoints: {
        values: {
            xs: 300,
            sm: 600,
            md: 960,
            lg: 1200,
            xl: 1536
        }
    },
    typography : {
        fontFamily: "Poppins, Roboto, sans-serif"
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration:"none", 
                    ":hover": {
                        textDecoration:"underline"
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform:"uppercase",
                    borderWidth:"2px",
                    ":hover": {
                        borderWidth:"2px"
                    }
                },
            },
            variants: [
                {
                    props: {
                        variant:"contained",
                    },
                    style: {
                        padding:"16px 40px",
                        backgroundColor:"#9661ff"
                    }
                },
                {
                    props: {
                        variant:"outlined",
                        color:"inherit"
                    },
                    style: {
                        ":hover": {
                            backgroundColor: "#9661ff"
                        }
                    }
                },
                {
                    props: {
                        variant:"outlined",
                        color:"error"
                    },
                    style: {
                        padding: "16px 40px"
                    }
                }
            ]
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: "0px 0px 39px rgba(0,0,0,0.5)"
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: "linear-gradient(90deg, rgba(107,42,238,1)0%, rgba(2,0,36,1) 100%)"
                }
            }
        }
    }
})


export default theme;