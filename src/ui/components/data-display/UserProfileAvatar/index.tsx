import { ProfessorInterface } from "@data/@types/professor";
import { Button, Grid, Icon, Skeleton } from "@mui/material";
import { UserAvatar } from "./styles";

interface UserProfileAvatarProps {
    onClick?: () => void;
    professor?: ProfessorInterface;
}

export default function UserProfileAvatar({
    onClick,
    professor
}: UserProfileAvatarProps) {
    const hasUser = professor !== undefined && professor.nome.length > 0
    return (
        <Button color="inherit" onClick={onClick}>
            <Grid container spacing={1} wrap="nowrap">
                <Grid item>
                    {hasUser ? (
                            <UserAvatar alt={professor?.nome}
                                src={professor?.foto_perfil}
                            />
                        )
                        :
                        (
                            <Skeleton
                                width={40}
                                height={40}
                                animation={"wave"}
                                variant="circular"
                            />
                        )
                    }
                </Grid>
                <Grid item container spacing={1} alignItems={"center"}>
                    
                    {hasUser ? (
                        <Grid item>nome</Grid>
                    ) : (
                        <Skeleton width={100} variant="text" animation="wave"/>
                    )}
                    <Grid item>
                        <Icon>
                            arrow_drop_down
                        </Icon>
                    </Grid>
                </Grid>
            </Grid>
        </Button>
    )
}