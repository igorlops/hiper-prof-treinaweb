import { styled, Typography, TypographyProps } from "@mui/material";
import {Container} from "@mui/material";

export const PageTitleContainer = styled("div")`
    margin: ${({theme}) => theme.spacing(5,0)};
    text-align: center;
`

export const PageTitleStyled = styled((props) => (
    <Typography variant="h1" component={'h1'} {...props}/>
))<TypographyProps>`
    text-transform: uppercase;
    font-weight: bold;

    ${({theme}) => theme.breakpoints.down("md")}{
        font-size: ${({theme}) => theme.typography.body1.fontSize};
    }
`;

export const PageSubtitleStyled = styled((props) => (
    <Typography variant="body1" component={"h3"} {...props} />
))<TypographyProps>`
    color: ${({theme}) => theme.palette.text.primary};
    text-transform: lowercase;
    color: ${({theme}) => theme.breakpoints.down("md")} {
        font-size: ${({theme}) => theme.typography.body2.fontSize};
    }
`;