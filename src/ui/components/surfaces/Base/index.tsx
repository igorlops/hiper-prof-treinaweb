import Link from "@components/navigation/Link";
import { AppBar, Box, Button, Container, Drawer, Icon, IconButton, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { BoxDrawer, ButtonStyle } from "./styles";
import { useRouter } from "next/router";
import { Router } from "@routes/routes";

export function LinkLogo() {
    return (
        <Link href="/">
            <img src="logo.png" alt="" />
        </Link>
    )
}
export default function Base({children}:PropsWithChildren) {
    const {breakpoints} = useTheme()
    const isSmDevice = useMediaQuery(breakpoints.up("sm")),
    [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false),
    router = useRouter()
    function onSejaProfessor() {
        Router.cadastroProfessor.push(router)
    }

    return (
        <Box sx={{height:"100%",minHeight:"100vh"}}>
            <AppBar position="static">
                <Toolbar component={Container}>
                    <Box sx={{width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    {isSmDevice ? 
                        (
                            <>
                                <LinkLogo/>
                                <Box sx={{display:"flex",alignItems:"center"}}>
                                    <Link href="/" color={"inherit"}>HOME</Link>
                                    <Link href="/login" color={"inherit"} sx={{mx:5}}>LOGIN</Link>
                                    <ButtonStyle variant="outlined" onClick={onSejaProfessor}>Seja um PROFESSOR</ButtonStyle>
                                </Box>
                            </>
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
                                    <BoxDrawer>
                                        <div className="linkImage">
                                            <LinkLogo/>
                                        </div>
                                        <Box sx={{display:"flex",flexDirection:"column",alignItems:"center", mx:5}}>
                                            <Link href="/">HOME</Link>
                                            <Link href="/login"  sx={{my:2}}>LOGIN</Link>
                                            <ButtonStyle variant="outlined">Seja um PROFESSOR</ButtonStyle>
                                        </Box>
                                    </BoxDrawer>
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