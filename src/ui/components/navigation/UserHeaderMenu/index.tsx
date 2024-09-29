import { ProfessorContext } from "@data/contexts/ProfessorContext";
import { useRouter } from "next/router";
import { useContext, useMemo, useRef } from "react";
import { UserHeaderMenuContainerStyled, UserMenu } from "./styles";
import { Icon, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import UserProfileAvatar from "@components/data-display/UserProfileAvatar";
import { Router } from "@routes/routes";
import { RouterTypeKeyOf } from "@data/@types/router";


interface UserHeaderMenuProps {
    isMenuOpen: boolean;
    onClick?: () => void;
    onMenuClick: (event: React.MouseEvent) => void;
    onMenuClose: (event: React.MouseEvent) => void;
    handleLogout: () => void;
}

export default function UserHeaderMenu({
    isMenuOpen = false,
    onClick,
    onMenuClick,
    onMenuClose,
    handleLogout,
}: UserHeaderMenuProps){

    const _router = useRouter(),
    { ProfessorState: professor} = useContext(ProfessorContext),
    containerRef = useRef(null),
    listMenu = useMemo(() => {
        return handleMenuRouter();
    },[professor])

    function handleMenuRouter( ) {
        return Object.keys(Router).map((value) => {
            const _value = value as  RouterTypeKeyOf
            return {
                nome: value.replace(/([a-z])([A-Z])/g,"$1 $2").toLowerCase(),
                router: Router[_value],
            };
        }).filter(({router}) => {
            return router.icon
        });
    }

    return (
        <UserHeaderMenuContainerStyled ref={containerRef} >
            <UserProfileAvatar professor={professor} onClick={onClick}/>
            <UserMenu 
                open={isMenuOpen} 
                anchorEl={containerRef.current}
                onClose={onMenuClose}
                onClick={onMenuClick}
                anchorOrigin={{
                    vertical:"bottom",
                    horizontal:"right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                { listMenu.map(({ nome, router}) => {
                    return (
                        <ListItem 
                            key={nome} 
                            disablePadding 
                            onClick={() => {
                                router.push(_router)
                            }}
                            
                            >
                            
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon>{router.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={nome}/>
                        </ListItemButton>
                    </ListItem>
                    )
                })}
                <ListItem disablePadding onClick={handleLogout}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon>logout</Icon>
                        </ListItemIcon>
                        <ListItemText primary={"Logout"}/>
                    </ListItemButton>
                </ListItem>

            </UserMenu>
        </UserHeaderMenuContainerStyled>
    )
}

