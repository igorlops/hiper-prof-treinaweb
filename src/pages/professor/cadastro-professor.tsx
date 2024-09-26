import PageTitle from "@components/data-display/PageTitle";
import CurrencyInputMask from "@components/inputs/CurrencyInputMask";
import useCadastroProfessor from "@data/hooks/pages/professor/useCadastroProfessor";
import { Box, Button, Card, CircularProgress, Snackbar, TextField } from "@mui/material";
import { BoxButtons } from "@styles/pages/professor/cadastro-professor.styles";

export default function CadastroProfessorPage() {
    const { 
            valuesCadastro,
            valuesErrorCadastro,
            snackMessage,
            setSnackMessage,
            setValuesCadastro,
            handleSubmit,
            loading
    } = useCadastroProfessor();
    return (
        <>    
            <PageTitle
                title="Cadastrar dados"
                />
            <Box sx={{maxWidth:"md", mx: "auto", my: 3}} component={'form'} onSubmit={handleSubmit}>
                <Card sx={{ p: 3 }}>
                    <TextField 
                        label={"Nome"} 
                        error={valuesErrorCadastro?.nome != undefined}
                        helperText={valuesErrorCadastro?.nome}
                        onChange={({target: {value}}) => {
                            setValuesCadastro((prevState) => ({...prevState, nome:value}));
                        }}
                        sx={{my:2}} 
                        fullWidth
                    />
                    <TextField 
                        label={"Idade"} 
                        error={valuesErrorCadastro?.idade != undefined}
                        helperText={valuesErrorCadastro?.idade}
                        onChange={({target: {value}}) => {
                            setValuesCadastro((prevState) => ({...prevState, idade:Number(value)}));
                        }}
                        sx={{my:2}} 
                        fullWidth
                    />
                    <CurrencyInputMask 
                        label={"Valor por aula"} 
                        error={valuesErrorCadastro?.valor_hora != undefined}
                        helperText={valuesErrorCadastro?.valor_hora}
                        onChange={({target: {value}}) => {
                            setValuesCadastro((prevState) => ({...prevState, valor_hora:value}));
                        }}
                        sx={{my:2}} 
                        fullWidth
                    />
                    <TextField 
                        label={"Descrição"} rows={4} 
                        error={valuesErrorCadastro?.descricao != undefined}
                        helperText={valuesErrorCadastro?.descricao}
                        sx={{my:2}} multiline 
                        onChange={({target: {value}}) => {
                            setValuesCadastro((prevState) => ({...prevState, descricao:value}));
                        }}
                        fullWidth
                    />
                </Card>
                <Card sx={{ p: 3, my: 5}}>
                    <TextField 
                        label={"Email"} type="email" 
                        error={valuesErrorCadastro?.email != undefined}
                        helperText={valuesErrorCadastro?.email}
                        sx={{my:2}} 
                        onChange={({target: {value}}) => {
                            setValuesCadastro((prevState) => ({...prevState, email:value}));
                        }}
                        fullWidth
                    />
                    <TextField 
                        label={"Senha"} type="password" 
                        error={valuesErrorCadastro?.password != undefined}
                        helperText={valuesErrorCadastro?.password}
                        onChange={({target: {value}}) => {
                            setValuesCadastro((prevState) => ({...prevState, password:value}));
                        }}
                        sx={{my:2}} 
                        fullWidth
                    />
                    <TextField 
                        label={"Confirmar senha"} type="password" 
                        error={valuesErrorCadastro?.password_confirmation != undefined}
                        helperText={valuesErrorCadastro?.password_confirmation}
                        onChange={({target: {value}}) => {
                            setValuesCadastro((prevState) => ({...prevState, password_confirmation:value}));
                        }}
                        sx={{my:2}} 
                        fullWidth
                    />
                </Card>
                <BoxButtons>
                    <Button type="submit" variant="contained">
                        {loading ? 
                        
                        <CircularProgress color="inherit"/> : 'Cadastrar'}
                    </Button>
                </BoxButtons>
            </Box>
            <Snackbar
                open = {snackMessage.length > 0}
                message={snackMessage}
                autoHideDuration={4000}
                onClose={() => setSnackMessage("")}
            />
        </>
    )
}