import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BoxButtons = styled(Box)`
    max-width: ${({theme}) => theme.breakpoints.values.xs}px;
    margin: auto;
`

export const BoxAvatar = styled("div") `
    display: flex;
    justify-content: center;
    margin:${({theme}) => theme.spacing(3)};

    .MuiAvatar-root {
        min-width: 100px;
        height: 100px;
    }

    .boxIcon {
        background-color: ${({theme}) => theme.palette.primary.main};
        position: absolute;
        border-radius: 100%;
        padding: ${({theme}) => theme.spacing(1)};
        right: 0;
        bottom: -10px

    }

    .MuiIcon-root {
        color: ${({theme}) => theme.palette.primary.contrastText};
    }

`