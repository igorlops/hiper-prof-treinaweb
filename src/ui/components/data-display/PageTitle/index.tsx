import { 
    PageSubtitleStyled, 
    PageTitleContainer, 
    PageTitleStyled 
} from "./styles";

import { Typography, TypographyProps } from "@mui/material";

export interface PageTitleProps extends Omit<TypographyProps, "title"> {
    title: string,
    subtitle?: string,
}
const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, color = "primary.light" }) => {
    return (
        <PageTitleContainer>
            <PageTitleStyled color={color}>{title}</PageTitleStyled>
            <PageSubtitleStyled>{subtitle}</PageSubtitleStyled>
        </PageTitleContainer>
    );
}

export default PageTitle;