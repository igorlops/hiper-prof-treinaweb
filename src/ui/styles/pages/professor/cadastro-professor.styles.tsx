import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BoxButtons = styled(Box)`
    max-width: ${({theme}) => theme.breakpoints.values.xs}px;
    margin: auto;
`