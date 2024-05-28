import React from "react"
import { Stack, Fade, Alert } from '@mui/material';

export type WhichAlert = 'success' | 'info' | 'warning' | 'error'

export default function ResultAlert (props: {type: WhichAlert, message: string, showAlert: boolean, setShowAlert: Function}){
    
    React.useEffect(() => {
        const timeId = setTimeout(() => {
            props.setShowAlert()
        }, 3000)
    
        return () => {
            clearTimeout(timeId)
          }
      }, [props]);


    return (
    <>
        <Stack sx={{ position: 'fixed', top: '90%', left: '5%'}}>            
            <Fade in={props.showAlert}>
                <Alert severity={props.type}>{props.message}</Alert>             
            </Fade>
        </Stack>
    </>            
    )
}