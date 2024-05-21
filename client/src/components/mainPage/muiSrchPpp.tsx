import React from 'react';
import data from '../editPopup/data';
import { Drawer, IconButton, Container, Divider, Typography, TextField, autocompleteClasses } from '@mui/material';
//import MuiHistRecord from './muiHistRecord';
import { BorderAllRounded, Search } from '@mui/icons-material';
import Close from '@mui/icons-material/Close';
//import { Row } from 'react-bootstrap';
//import { relative } from 'path';
//import { closeDialog } from '../mainPage/testpage';

export default function MuiSrchPpp() {
    const [isDrawerOpen, setisDrawerOpen] = React.useState(false);
    //const closeParentDialog = React.useContext(closeDialog);
    const sendMessage = (event: any) => {
        
        {/* if (event.key === "Enter" && event.target.value !== "") {
            event.preventDefault();
            setMessages([...messageArr, {
                id: messageArr.length + 1,
                author: "Илья Красненков",
                date_sent: new Date(),
                text: event.target.value,
                avatar: "https://avatars.mds.yandex.net/get-yapic/23186/enc-fcff59d213e265d10a2cccb679221e95c9b92a7e71c02c7c269cd6e384249449/islands-retina-middle"
            }])
            event.target.value = "";
        */}
        }
 //   const recordArr = data.hist;
    return (    
            <>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, marginRight: '0px'}}
                    onClick={() => setisDrawerOpen(true)}>
                   <Search/>
                </IconButton>
                <Drawer
                sx={{zIndex: 1400}}
                variant='temporary' 
                anchor={'right'} 
                PaperProps={{ sx:{width: {md:'30%', sm: '70%'}}}} 
                open={isDrawerOpen}  
                onClose={() => setisDrawerOpen(false)}>
                    <Container sx={{
                        marginTop: '20px',
                        //marginBottom: 'auto',  
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',  
                        '&::-webkit-scrollbar-track':{
                                    backgroundColor: '#147ccc00',
                        },
                        '&::-webkit-scrollbar': {
                            width: '10px',
                        },
                                
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: '0px',
                            backgroundColor: '#15739800',
                            borderRight: '0.1px solid #157398',
                        },
                    }}
                    >
                        <Container sx={{
//                            display: 'inline-flex',
//                            flexDirection: 'column',
//                            position: 'relative',
//                            minWidth: '0px',
                            padding: ['0px', '0px', '0px', '0px'],
//                            border: ['0px', 'none'],
//                          margin: ['0px', '0px', '0px', '0px'],
                            marginRight: '12px',
                            width: '100%'
                        }}
                        >    
                            <TextField 

                                onKeyDown={(event) => sendMessage(event)}
                                //id="standard-textarea"
                                placeholder="Введите для поиска"
                                variant="outlined"
                                fullWidth
                                focused
                                sx={{marginLeft: '0px'                                                 
                            }}                                                                                                            
                            >                                
                            </TextField>
                        </Container>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{marginLeft: '0px'                              
                            }}
                            onClick={() => setisDrawerOpen(false)}                               
                        >
                            <Close/>
                        </IconButton>                                                                      
                    </Container>
                    <Divider sx={{marginTop: '20px'}} orientation='horizontal' variant='fullWidth' flexItem/>
                    <Typography variant='h5' style={{marginLeft: '24px', marginTop: '20px'}} >Результат поиска</Typography>
                    <Container>
                     
                    </Container>    
                </Drawer>
            </>
    );
}

 