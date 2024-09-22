import PageTitle from "@components/data-display/PageTitle";
import useLogin from "@data/hooks/pages/useLogin";
import { Box, Button, Card, CircularProgress, Snackbar, TextField } from "@mui/material";
import { BoxButtons, ButtonRecAccount } from "@styles/pages/login.styles";

export default function LoginPage() {
    const {
        messageError,
        setValuesLogin,
        handleLogin, 
        snackMessage,
        setSnackMessage,
        loading
    } = useLogin();
    return (
        <Box sx={{
            maxWidth:"sm", 
            mx:'auto', 
            display:"flex", 
            flexDirection:"column",
            justifyContent:"center"
        }}>
            <PageTitle 
                title="Consultar minhas aulas"
                subtitle="Faça login para poder consultar as aulas"
            />
            <Card sx={{
                    boxShadow:"none",
                    alignItems:"center", 
                    display: "flex",
                    flexDirection: "column"
                }}
                component={"form"}
                onSubmit={handleLogin}
            >
                <TextField 
                    label={"Email"} 
                    error={messageError?.email != undefined}
                    helperText={messageError?.email}
                    sx={{mt:3}} 
                    onChange={({ target: { value }}) => {
                        setValuesLogin((prevState) => {
                            return {...prevState, email: value}
                        });
                    }}
                    type="email" 
                    fullWidth
                />
                <TextField 
                    label={"Senha"} 
                    error={messageError?.password != undefined}
                    helperText={messageError?.password}
                    onChange={({ target: { value }}) => {
                        setValuesLogin((prevState) => {
                            return {...prevState, password: value}
                        });
                    }}
                    type="password" 
                    fullWidth 
                    sx={{my:3}}
                />
                <BoxButtons>
                    <Button 
                        variant="contained" 
                        fullWidth
                        sx={{my:2}}    
                        type="submit"
                    >
                        {!loading ? "Acessar" : <CircularProgress color="inherit"/>}
                    </Button>
                    <ButtonRecAccount size="small">
                        Não possui conta? Cadastre-se agora
                    </ButtonRecAccount>
                </BoxButtons>
            </Card>
            <Snackbar 
                open={snackMessage.length > 0} 
                message={snackMessage}
                onClose={() => setSnackMessage("")}
                autoHideDuration={4000}
            />
        </Box>
    );
}