import Fetch from "@components/data-display/Fetch";
import PageTitle from "@components/data-display/PageTitle";
import ListaProfessorCard from "@components/data-display/ProfessorCard/listaProfessorCard";
import usePesquisaProfessor from "@data/hooks/pages/usePesquisaProfessor";
import { Container, Icon, TextField } from "@mui/material";

export default function PesquisaProfessorPage(){
    const { professores, onSearch, selecionarProfessor } = usePesquisaProfessor();
    return (
        <>
            <TextField
                sx={{mt:5}}
                label={'Encontre um professor'}
                InputProps={{
                    startAdornment: <Icon sx={{ mr:1}}>search</Icon>
                }}
                onChange={({target: {value}}) => (onSearch(value))}
                fullWidth
                required
            />
            <Container>
                <PageTitle 
                    title="Professores encontrados"
                    subtitle="Clique sobre um professor para ver os detalhes e poder marcar um aula com o mesmo"
                />
                <Fetch
                    maxLength={3}
                    data={professores}
                    message={"Nenhum professor encontrado"}
                    render={(professores) => (

                        <ListaProfessorCard 
                            professores={professores} 
                            onClick={selecionarProfessor}
                        />
                    )}
                />
            </Container>
        </>
    )
}