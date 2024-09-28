import Fetch from "@components/data-display/Fetch";
import PageTitle from "@components/data-display/PageTitle";
import { AlunoInterface } from "@data/@types/alunos";
import usePainelProfessor from "@data/hooks/pages/professor/usePainelProfessor";
import { TextFormatService } from "@data/services/TextFormatService";
import { Accordion, AccordionDetails, AccordionSummary, Box, Icon, Typography } from "@mui/material";
import { AccordionStyled } from "@styles/pages/professor/index.styles";
import { useState } from "react";

export default function PainelProfessorPage() {
    const { 
        alunos,
        expanded,
        setExpanded
    } = usePainelProfessor()
    return (
        <>
            <PageTitle title="Lista de Alunos"/>
            <Fetch
                data={alunos}
                message={"Nenhum aluno agendado"}
                render={(alunos) => {
                    return (
                        <AlunosList
                            alunos={alunos}
                            expanded={expanded}
                            setExpanded={setExpanded} />
                    );
                }}
                maxLength={3}
            />
        </>
    )
}

interface AlunosListProps {
    alunos: AlunoInterface[]
    setExpanded: (value: string) => void
    expanded: string
}

function AlunosList ({alunos,expanded,setExpanded} : AlunosListProps) {
    return (
        <>
            {alunos.map((aluno) => (
                <Box key={aluno.id} sx={{my: 5}}>
                    <AccordionStyled
                        onChange={
                            (_, b) => b? setExpanded(aluno.id.toString()) : setExpanded("")
                        } 
                        expanded={expanded === aluno.id.toString()}>
                        <AccordionSummary>
                            <Typography variant="h6" sx={{mb:2}}>{aluno.nome}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography >
                                <Icon>person</Icon>
                                {aluno.nome}
                            </Typography>
                            <Typography >
                                <Icon>
                                    calendar_month
                                </Icon>
                                {TextFormatService.dateFromText(aluno.data_aula.toString() )}
                            </Typography>
                            <Typography>
                                <Icon>
                                    email
                                </Icon>
                                {aluno.email}
                            </Typography>
                        </AccordionDetails>
                    </AccordionStyled>

                </Box>
            ))}
        </>
    )
}