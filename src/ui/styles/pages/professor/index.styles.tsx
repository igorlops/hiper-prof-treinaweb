import { Accordion, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const AccordionStyled = styled(Accordion)`
    .MuiAccordionSummary-root {
        background-color: ${({theme}) => theme.palette.primary.light};
        color: ${({theme}) => theme.palette.primary.contrastText};
        border-radius: ${({theme}) => theme.spacing(1)};
    }
    .MuiTypography-root {
        margin-top:1em;
        display:flex;
        align-items:"center";
        gap: 10px;
    }
    .MuiAccordionDetails-root {
        padding: ${({theme}) => theme.spacing(2)};
    }
    .MuiIcon-root {
        margin-right: ${({theme}) => theme.spacing(2)};
    }
`