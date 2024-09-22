import PageTitle from "@components/data-display/PageTitle";
import { Box, Button, Card, TextField } from "@mui/material";
import { BoxButtons, ButtonRecAccount } from "@styles/pages/login.styles";

export default function LoginPage() {

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
            }}>
                <TextField label={"Email"} sx={{mt:3}} type="email" fullWidth/>
                <TextField label={"Senha"} type="password" fullWidth sx={{my:3}}/>
                <BoxButtons>
                    <Button variant="contained" fullWidth>Acessar</Button>
                    <ButtonRecAccount size="small">
                        Não possui conta? Cadastre-se agora
                    </ButtonRecAccount>
                </BoxButtons>
            </Card>
        </Box>
    );
}