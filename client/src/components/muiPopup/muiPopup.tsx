import React from 'react';
import EditPopupProps from '../interfaces/editPopupProps';
import PopupBar from './popupBar';
import MuiDialog from './muiDialog';
import data from '../editPopup/data';
import { Box, Button, ButtonGroup, Container, Grid, Stack, TextField, Typography, Divider } from '@mui/material';
import { Add } from '@mui/icons-material';
import impulsTheme from '../../muiTheme';
import { ThemeProvider } from '@emotion/react';



export default function MuiPopup(props: EditPopupProps = data.object) {
    
    const statusButtons = [{value: 'На утверждение', style: 'accept_offer_button'},
                           {value: 'На доработку', style: 'rework_button'},
                           {value: 'Утвердить', style: 'accept_button'},
                           {value: 'В разработке', style: 'inwork_button'}]
    const [tags, setTags] = React.useState(props.tags);
    const [links, setLinks] = React.useState(props.links)
    const [file, setFile] = React.useState(null)
    const [formOpen, setFormOpen] = React.useState(false);
    const [status, setStatus] = React.useState(props.status);
    
    const changeStatus = (value: string) => {
        setStatus(value);
    }
    
    const addTags = (value: {key:string, value:string | number}) => {
        setTags([...tags, value]);
    }


    const addLinks = (value : string) => {
        let newLink = value;
        console.log(value)
        if (newLink && (newLink.includes('https://') || newLink.includes('http://') )) {
            setLinks([...links, newLink]);
        } else if (newLink) {
            setLinks([...links, 'https://'.concat(newLink)])
        }
    }

    
    const handleFileChange = (event: any) => {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            setFile(file);
            console.log(file);
        } else {
            setFile(null);
        }
    };

    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const handleButtonClick = () => {
        inputRef.current?.click(); 
    };


    const handleCloseForm = () => {
        setFormOpen(false);
    }

    const handleOpenForm = () => {
        setFormOpen(true);
    }

    const mdGridName = 1.5
    const mdGridValue = 5
    const mdGridSpace = 12-mdGridName-mdGridValue
    const smGridName = 3
    const smGridValue = 8
    
  return (
    <>
    <ThemeProvider theme={impulsTheme}>
        <Container disableGutters sx={{
            maxWidth:'900px', 
            height: 800,
            display:'flex',
            flexDirection: 'column',
        }}>
            <PopupBar />
            <Container sx={{backgroundColor:'#EDF5FB', overflow:'auto', height:'100%', 
                    '&::-webkit-scrollbar': {
                        width: '5px'
                    },
                    '&::-webkit-scrollbar-track': {
                        'background-color': '#147ccc00'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#157298',
                        outline: '1px solid slategrey',
                        'border-radius': '10px',
                        border: '0.1px solid #00000041'
              }
                }}>
                    <Stack spacing={2} sx={{backgroundColor:'EDF5FB'}}>
                        <Typography variant='h5'  style={{display: 'flex', marginTop: 10 ,justifyContent:'space-between', alignItems:'center'}}>{data.object.name}</Typography>
                            <Stack direction={'row'} spacing={10}  display={'flex'} flex={'flex-start'}>
                                <Typography>Дата создания {data.object.date_created.toLocaleDateString()}</Typography>
                                <Typography>Дата изменения {data.object.date_changed.toLocaleDateString()}</Typography>
                            </Stack>
                        <Divider style={{marginTop: 0}}orientation='horizontal' variant='fullWidth' flexItem/>
                        
                        <Grid container spacing={1} alignItems={'flex-start'}>
                            <Grid item md={mdGridName} xs={smGridName} > 
                                <Typography align='left'>Описание</Typography>
                            </Grid>
                            <Grid item md={mdGridValue} xs={smGridValue}  textAlign='left'>
                                <TextField 
                                id="standard-textarea"
                                placeholder="Описание объекта"
                                multiline
                                fullWidth
                                rows={3}
                                defaultValue={data.object.desc}
                                variant="outlined">
                                </TextField>
                            </Grid>
                            <Grid item md={mdGridSpace} xs={0}/>

                            <Grid item md={mdGridName} xs={smGridName}> 
                                <Typography align='left'>Автор</Typography>
                            </Grid>
                            <Grid item md={mdGridValue-2} xs={smGridValue-3} textAlign='left'>
                                <TextField 
                                id="outlined-basic"
                                size='small'
                                fullWidth
                                defaultValue={data.object.author}
                                variant="outlined">
                                </TextField>
                            </Grid>
                            <Grid item md={mdGridSpace+2} xs={mdGridSpace-3}/>

                            <Grid item md={mdGridName} xs={smGridName}> 
                                <Typography align='left'>Статус</Typography>
                            </Grid>
                            <Grid item md={mdGridValue-3} xs={smGridValue-3} textAlign='left'>
                                    <TextField  size='small' id="outlined-basic" variant="outlined"  value={status}/>
                            </Grid>                            
                            <Grid item md={mdGridSpace+3} xs={12} textAlign='left'>                            
                                    <ButtonGroup size='small' sx={{width: {xs:'100%'}}}>
                                            {statusButtons.map((button) => (
                                                <Button size='small'  onClick={() =>changeStatus(button.value)} key={statusButtons.indexOf(button)} disabled={status===button.value}>{button.value}</Button>
                                            ))}
                                    </ButtonGroup>
                            </Grid>

                            <Grid item md={mdGridName} xs={smGridName}> 
                                <Typography align='left'>Тип</Typography>
                            </Grid>
                            <Grid item md={mdGridValue-3} xs={smGridValue-3} textAlign='left'>
                                <TextField  size='small' id="outlined-basic" variant="outlined"  defaultValue={data.object.type}/>
                            </Grid>
                            <Grid item md={mdGridSpace+3} xs={4} textAlign='left'>
                                <Button size='small' variant='outlined'>Изменить</Button>
                            </Grid>

                            <Grid item md={mdGridName} xs={smGridName}> 
                                <Typography align='left'>Приоритет</Typography>
                            </Grid>
                            <Grid item md={mdGridValue} textAlign='left' xs={smGridValue-3}>
                                <TextField  size='small' id="outlined-basic" variant="outlined"  defaultValue={data.object.priority}/>
                            </Grid>
                            <Grid item md={mdGridSpace} xs={4}/>

                            <Grid item md={mdGridName} xs={smGridName}> 
                                <Typography align='left'>Вложения</Typography>
                            </Grid>
                            <Grid item md={mdGridValue} textAlign='left' xs={smGridValue-3}>
                                <TextField  size='small' fullWidth id="outlined-basic" variant="outlined"  value={file ? file['name'] : ''} />
                            </Grid>
                            <Grid item md={mdGridSpace} textAlign='left' xs={4}>
                                <Button size='small' variant='outlined' onClick={handleButtonClick}>Изменить</Button>
                                <input id='input_epw'type="file"  ref={inputRef} onChange={handleFileChange} style={{display: 'none'}} defaultValue={file ? file['name'] : ''}/>
                            </Grid>  

                            <Grid item md={mdGridName} xs={smGridName}> 
                                <Typography align='left'>Путь</Typography>
                            </Grid>
                            <Grid item md={mdGridValue} textAlign='left' xs={smGridValue-3}>
                                <TextField  size='small' fullWidth id="outlined-basic" variant="outlined" defaultValue={data.object.path}/>

                            </Grid>
                            <Grid item md={mdGridSpace} textAlign='left' xs={4}>
                                <Button  size='small'  variant='outlined'>Изменить</Button>
                            </Grid>
                        </Grid>
                    </Stack>

                    <Container sx={{marginTop:'50px'}}>
                            <Button onClick={handleOpenForm} sx={{display:'flex', margin:'10px'}}><Add fontSize='large'/>Добавить ссылку</Button>
                            <Stack direction={'column'} spacing={1} textAlign={'left'} marginLeft={'60px'}>
                                {links.map((link) => (
                                        <Typography  key={links.indexOf(link)} ><a href={link} key={links.indexOf(link)}>{link}</a></Typography>
                                    ))}
                            </Stack>
                    </Container>
                    <Container>
                            <Button onClick={() => addTags({key: 'Тэг'+(tags.length+1), value: ""})} sx={{display:'flex', margin:'10px'}}><Add fontSize='large'/>Добавить тэг</Button>
                            <Stack direction={'column'} spacing={1} textAlign={'left'} marginLeft={'60px'}>
                                {tags.map((tag) => (
                                    <Stack direction={'row'} spacing={1} key={tags.indexOf(tag)} textAlign={'left'} >
                                        <TextField id="standard-basic" key={tags.indexOf(tag)}defaultValue={tag.key} variant="standard" sx={{width:'60px'}}/>
                                        <TextField size='small' id="outlined-basic" defaultValue={tag.value} variant="outlined" />
                                    </Stack>
                                    ))}
                            </Stack>
                    </Container>
                    <Container>
                            <Typography align='left'><Add fontSize='large'/>Зависимости</Typography>
                            <Box color={'black'} width={'30px'} height={'30px'}></Box>
                    </Container>
                    
                </Container>
            <MuiDialog formOpen={formOpen} handleCloseForm={handleCloseForm} addLinks={addLinks} />
        </Container>
    </ThemeProvider>
    </>
  );
}