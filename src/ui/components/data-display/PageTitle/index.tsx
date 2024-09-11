import { PageSubtitleStyled, PageTitleContainer, PageTitleStyled } from "./styles";


export interface PageTitleProps {
    title: string,
    subtitle?: string,
}
const PageTitle: React.FC<PageTitleProps> = ({title,subtitle}) => {
    return (
        <PageTitleContainer>
            <PageTitleStyled color={'primary'}>{title}</PageTitleStyled>
            <PageSubtitleStyled>{subtitle}</PageSubtitleStyled>
        </PageTitleContainer>
    );
}

export default PageTitle;