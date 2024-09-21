import { Box, CircularProgress, Typography } from "@mui/material";
import { ReactElement } from "react";

interface FetchProps<T = unknown> {
    data: T[] | undefined;
    render: (data: T[]) => ReactElement;
    message?:string;
    maxLength: number
}

type FetchComponentType = <B>(props: FetchProps<B>) => ReactElement; 

const Fetch:FetchComponentType = ({ data, render, message, maxLength}) => {

    if(data) {
        const dataFiltered = data.slice(0,maxLength);
        if(dataFiltered.length === 0) {
            return <Typography>{message}</Typography>;
        }
        return render(dataFiltered) 
    }
    return (
        <Box>
            <CircularProgress/>
        </Box>
    )
}

export default Fetch
