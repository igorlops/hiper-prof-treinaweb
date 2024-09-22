import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { 
    Dialog as MuiDialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
 } from "@mui/material" 
import { PropsWithChildren } from "react";

interface DialogProps {
    title?: string;
    isOpen?: boolean;
    onClose: () => void;
    onCancel?: () => void;
    onConfirm: () => void;

}

export default function Dialog({
        isOpen = true, 
        onClose, 
        onCancel, 
        onConfirm,
        title,
        children
    }: PropsWithChildren<DialogProps>) {

    return (
        <MuiDialog open={isOpen} onClose={onClose}>
            <DialogTitle 
                color={"primary"}
                fontSize={'small'}
                textAlign={'center'}
            >
                {title}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
            {onCancel && (
                <Button 
                    variant="outlined"
                    onClick={onCancel}
                    sx={{py:2, px:3}}
                >
                    Cancelar
                </Button>
            )}
                <Button 
                    variant="contained"
                    type="submit"    
                    fullWidth={onCancel === undefined}
                    onClick={onConfirm}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </MuiDialog>
    );
}