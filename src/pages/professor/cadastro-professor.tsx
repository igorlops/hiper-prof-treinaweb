import PageTitle from "@components/data-display/PageTitle";
import Dialog from "@components/feedback/Dialog";
import ButtonFile from "@components/inputs/ButtonFile";
import CurrencyInputMask from "@components/inputs/CurrencyInputMask";
import { ProfessorInterface } from "@data/@types/professor";
import useCadastroProfessor from "@data/hooks/pages/professor/useCadastroProfessor";
import { Avatar, Box, Button, Card, CircularProgress, Icon, Snackbar, TextField, Typography } from "@mui/material";
import { BoxAvatar, BoxButtons } from "@styles/pages/professor/cadastro-professor.styles";
import { FormEvent } from "react";

export default function CadastroProfessorPage() {
    const { 
            valuesCadastro,
            valuesErrorCadastro,
            snackMessage,
            setSnackMessage,
            setValuesCadastro,
            handleSubmit,
            loading,
            professor,
            saveFoto,
            openDialog,
            setOpenDialog,
            deleteAccount
    } = useCadastroProfessor();
    return (
        <>    
            { professor?.id && (
                <>
                    <BoxAvatar>
                        <ButtonFile onChange={saveFoto}>
                            <Avatar src={professor.foto_perfil}>
                                {Object.hasOwn(professor, "nome") && professor.nome[0]}
                            </Avatar>
                            <div className="boxIcon">
                                <Icon>add_a_photo</Icon>
                            </div>
                        </ButtonFile>
                    </BoxAvatar>
                </>
            )}
            <PageTitle
                title={professor?.id ? "Editar professor" : "Cadastrar dados"}
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
                        value={valuesCadastro?.nome ?? ''}
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
                        value={valuesCadastro?.idade ?? ''}
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
                        value={valuesCadastro?.valor_hora ?? ''}

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
                    value={valuesCadastro?.descricao ?? ''}
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
                        value={valuesCadastro?.email ?? ''}
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
                    <ButtonSubmit
                        handleSubmit={handleSubmit}
                        loading={loading}
                        professor={professor}
                    />
                </BoxButtons>
                {professor?.id && (
                    <>
                        <Typography variant="body2"
                            color={"grey"}    
                            textAlign={"center"}
                            sx={{my:4}}
                        >
                            Você pode apagar a sua conta, desse modo não será
                            mais exibido na plataforma.
                        </Typography>
                        <BoxButtons>
                            <Button 
                                onClick={() => setOpenDialog(true)} 
                                fullWidth 
                                variant="outlined" 
                                color="error">
                                {loading ? 
                                    <CircularProgress color="inherit"/> 
                                    : 
                                    "Apagar minha conta"
                                }
                            </Button>
                        </BoxButtons>
                    </>
                )}
            </Box>
            <Snackbar
                open = {snackMessage.length > 0}
                message={snackMessage}
                autoHideDuration={4000}
                onClose={() => setSnackMessage("")}
            />
            <Dialog
                isOpen={openDialog}
                title="Tem certeza que deseja excluir?"
                onConfirm={ deleteAccount }
                onCancel={() => setOpenDialog(false)}
                onClose={() => setOpenDialog(false)}
            />
        </>
    )
}

interface ButtonSubmitProps {
    professor: ProfessorInterface | undefined;
    handleSubmit: () => void
    loading: boolean
}
function ButtonSubmit({handleSubmit,professor,loading}:ButtonSubmitProps) {
    if(loading) {
        return (
            <Button onClick={handleSubmit} fullWidth variant="contained">
                <CircularProgress color="inherit"/>
            </Button>
        )
    } 
    return (
        <Button onClick={handleSubmit} fullWidth variant="contained">
            {professor?.id ? "Editar" : "Cadastrar"}
        </Button>
    )
}