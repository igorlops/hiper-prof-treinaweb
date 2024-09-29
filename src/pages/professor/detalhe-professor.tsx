import Fetch from "@components/data-display/Fetch";
import PageTitle from "@components/data-display/PageTitle";
import ListaProfessorCard from "@components/data-display/ProfessorCard/listaProfessorCard";
import Dialog from "@components/feedback/Dialog";
import useDetalheProfessor from "@data/hooks/pages/professor/useDetalheProfessor";
import { TextFormatService } from "@data/services/TextFormatService";
import { Button, CircularProgress, Container, Input, Snackbar, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { BoxCardProfessor, BoxDescription, BoxImage } from "@styles/pages/professor/detalhe-professor.styles";
import InputMask from 'react-input-mask'
export default function DetalheProfessor() {
    const {       
        professor,
        professores,
        selecionarProfessor,
        openDialog,
        setOpenDialog,
        setAluno,
        handleSubmit,
        snackMessage,
        setSnackMessage,
        alunoErro,
        setAlunoErro,
    } = useDetalheProfessor();

    console.log(professor)
    return (
        <Container>
            <PageTitle 
                title="Detalhes do professor"
                subtitle="Veja os detalhes do professor e verifique se ele é o ideal para você se candidatar a uma aula."
            />

            <BoxCardProfessor>
                <BoxImage foto={professor?.foto_perfil}/>
                <BoxDescription>
                    <div className="box_esquerda">
                        <Typography variant="h6">{professor?.nome}</Typography>
                        <Typography sx={{my:2}} className="descricao" variant="body2" paragraph>
                            {professor?.descricao}
                        </Typography>
                    </div>
                    <div className="box_direita">
                        <Typography variant="h6" sx={{my:2}}>PREÇO HORA/AULA</Typography>
                        <Typography variant="h4" paragraph>{TextFormatService.currency(professor?.valor_hora)}</Typography>
                        <Button 
                            color="inherit" 
                            variant="outlined"
                            onClick={() => setOpenDialog(true)}    
                        >
                                Contratar
                        </Button>
                    </div>

                </BoxDescription>
            </BoxCardProfessor>
            <Typography variant="body2" color={grey} sx={{my:10}}>
                {professor?.descricao}
            </Typography>
            <Fetch 
                maxLength={3}
                data={professores?.filter(({id}) => {
                    return id !== professor?.id
                })}
                render={(professores) =>{
                    return (
                        <>
                            <PageTitle 
                                title="Outros professores sugeridos"
                                subtitle=""
                            />
                            <ListaProfessorCard
                                professores={professores} 
                                onClick={selecionarProfessor}
                            />
                        </>
                    )
                }}
            />

            <Dialog
                title="Preencha suas informações"
                onConfirm={handleSubmit}
                onClose={() => setOpenDialog(false)}
                isOpen={openDialog}
            >
                <TextField 
                    label={"Seu nome"} 
                    fullWidth
                    error={alunoErro?.nome != undefined}
                    helperText={alunoErro?.nome}
                    onChange={({target: { value }}) => setAluno((prevState) => {
                        return {...prevState, nome:value}
                    })}
                />
                <TextField 
                    label={"Seu e-mail"}
                    type="email" 
                    error={alunoErro?.email != undefined}
                    helperText={alunoErro?.email}
                    sx={{my:3}} 
                    fullWidth
                    onChange={({target: { value }}) => setAluno((prevState) => {
                        return {...prevState, email:value}
                    })}
                />
                <InputMask
                    mask={'99/99/9999 99:99'}
                    onChange={({target: { value }}:any) => {
                        setAluno((prevState) => {
                            return {...prevState, data_aula:value}
                        }
                    )}}
                >
                    {
                        () => (
                            <TextField 
                                label={"Horário da aula"}    
                                error={alunoErro?.data_aula != undefined}
                                helperText={alunoErro?.data_aula as string}
                                fullWidth
                            />
                        )
                    }

                </InputMask>
            </Dialog>
            <Snackbar
                open={snackMessage.length > 0}
                message={snackMessage}
                autoHideDuration={4000}
                onClose={() => {
                    setSnackMessage("")
                    setAlunoErro(undefined)
                }}
            />
        </Container>
    )
}