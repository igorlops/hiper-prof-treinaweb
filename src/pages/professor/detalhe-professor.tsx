import Fetch from "@components/data-display/Fetch";
import PageTitle from "@components/data-display/PageTitle";
import ListaProfessorCard from "@components/data-display/ProfessorCard/listaProfessorCard";
import useDetalheProfessor from "@data/hooks/pages/professor/useDetalheProfessor";
import { TextFormatService } from "@data/services/TextFormatService";
import { Button, CircularProgress, Container, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { BoxCardProfessor, BoxDescription, BoxImage } from "@styles/pages/professor/detalhe-professor.styles";

export default function DetalheProfessor() {
    const { professor, professores, selecionarProfessor } = useDetalheProfessor();
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
                        <Button color="inherit" variant="outlined">Contratar</Button>
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
                message="Nenhum professor encontrado"
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
        </Container>
    )
}