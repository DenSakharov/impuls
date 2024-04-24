import React from "react"
import { Stack, Fade, Alert } from '@mui/material';

export default function SuccessAlert ({user, showAlert, setShowAlert}: any){

    
    React.useEffect(() => {
        console.log('effect')
        const timeId = setTimeout(() => {
          setShowAlert(false)
        }, 3000)
    
        return () => {
            clearTimeout(timeId)
          }
      }, [user]);


    return (
    <>
        <Stack sx={{ position: 'fixed', top: '90%', left: '5%'}}>            
            <Fade in={showAlert}>
                <Alert severity="success">Отправил на согласование пользователю {user}.</Alert>             
            </Fade>
        </Stack>
    </>            
    )
}