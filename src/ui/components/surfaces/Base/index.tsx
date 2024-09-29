import Link from "@components/navigation/Link";
import { AppBar, Box, Button, Container, Drawer, Icon, IconButton, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { PropsWithChildren, useContext, useState } from "react";
import { BoxDrawer, ButtonStyle } from "./styles";
import { NextRouter, useRouter } from "next/router";
import { Router } from "@routes/routes";
import UserHeaderMenu from "@components/navigation/UserHeaderMenu";
import { ProfessorContext } from "@data/contexts/ProfessorContext";
import { ProfessorInterface } from "@data/@types/professor";
import { ApiService } from "@data/services/ApiService";

export function LinkLogo({professor}:{ professor?: ProfessorInterface}) {
    return (
        <Link href={professor?.id ? '/professor' : '/'}>
            <img src="logo.png" alt="" />
        </Link>
    )
}
export default function Base({children}:PropsWithChildren) {
    const {breakpoints} = useTheme()
    const isSmDevice = useMediaQuery(breakpoints.up("sm")),
    [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false),
    router = useRouter(),
    {ProfessorState: professor,ProfessorDispatch} = useContext(ProfessorContext)

    async function handleLogout() {
        await ApiService.post('/api/auth/logout', {
            refresh_token: localStorage.getItem('refresh_token_hiperprof')
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_hiperprof')}`
            }
        })
        .then(() => {
            localStorage.removeItem('refresh_token_hiperprof')
            localStorage.removeItem('token_hiperprof') 
            ProfessorDispatch(undefined);
            Router.home.push(router)
        })
    }

    return (
        <Box sx={{height:"100%",minHeight:"100vh"}}>
            <AppBar position="static">
                <Toolbar component={Container}>
                    <Box sx={{width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    {isSmDevice ? 
                        (
                            <HeaderDesktop router={router} professor={professor} onLogout={handleLogout}/>
                        ) : (
                            <>
                                <LinkLogo/>
                                <IconButton 
                                    color="inherit"
                                    onClick={() => setIsOpenDrawer(true)}    
                                    >
                                    <Icon>menu</Icon>
                                </IconButton>
                                <Drawer open={isOpenDrawer}
                                    onClick={() => setIsOpenDrawer(false)}
                                    onClose={() => setIsOpenDrawer(false)}
                                >
                                    <HeaderMobile professor={professor} onLogout={handleLogout} />
                                </Drawer>
                            </>
                        )
                    }
                    </Box>
                </Toolbar>
            </AppBar>
            <Container component={"main"}>{children}</Container>
        </Box>
    )
}

interface HeaderDesktopProps {
    router:NextRouter;
    professor?: ProfessorInterface;
    onLogout?: () => void
}

function HeaderDesktop({router, professor, onLogout}:HeaderDesktopProps) {
    function onSejaProfessor() {
        Router.cadastroProfessor.push(router)
    }

    const [openMenu, setOpenMenu] = useState(false);


    return (
        <>
            <LinkLogo professor={professor}/>
            <Box sx={{display:"flex",alignItems:"center"}}>
                {professor?.id ? (
                    <>
                        <Link href="/professor" color={"inherit"} sx={{ mx: 2}}>
                            Lista de alunos
                        </Link>
                        <UserHeaderMenu
                            isMenuOpen={openMenu}
                            onMenuClick={() => setOpenMenu(false)}
                            onMenuClose={() => setOpenMenu(false)}
                            onClick={() => setOpenMenu(true)}
                            handleLogout={() => onLogout}
                        />
                    </>
                ) : (
                    <>
                        <Link href="/" color={"inherit"}>HOME</Link>
                        <Link href="/login" color={"inherit"} sx={{mx:5}}>LOGIN</Link>
                        <ButtonStyle variant="outlined" onClick={onSejaProfessor}>Seja um PROFESSOR</ButtonStyle>
                    </>
                )}
            </Box>
        </>
    );
}

interface HeaderMobileProps {
    professor?: ProfessorInterface;
    onLogout?: () => void
}

function HeaderMobile({professor, onLogout}: HeaderMobileProps) {
    return (
        <>
            <BoxDrawer>
                <div className="linkImage">
                    <LinkLogo/>
                </div>
                {professor?.id ? (
                    <MenuListDrawerLinks>
                        <Link href="/professor">Lista de alunos</Link>
                        <Link href="/professor/cadastro-professor"  sx={{my:2}}>Cadastro Professor</Link>
                        <Link href="/" onClick={onLogout}>Logout</Link>
                    </MenuListDrawerLinks>
            ) : (
                <MenuListDrawerLinks>
                    <Link href="/">HOME</Link>
                    <Link href="/login"  sx={{my:2}}>LOGIN</Link>
                    <ButtonStyle variant="outlined">Seja um PROFESSOR</ButtonStyle>    
                </MenuListDrawerLinks>
            )}
            </BoxDrawer>
            
        </>
    )
}

function MenuListDrawerLinks({children} : PropsWithChildren) {
    return (
        <Box sx={{display:"flex",flexDirection:"column",alignItems:"center", mx:5}}>{children}</Box>
    )
}