import React from 'react';
import EditPopupProps from '../interfaces/editPopupProps';
import HistChanges from '../editPopup/histChanges';
import PopupBar from './popupBar';
import data from '../editPopup/data';
import { Box, Button, ButtonGroup, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function MuiPopup(props: EditPopupProps = data.object) {
    
    const statusButtons = [{value: 'На утверждение', style: 'accept_offer_button'},
                           {value: 'На доработку', style: 'rework_button'},
                           {value: 'Утвердить', style: 'accept_button'},
                           {value: 'В разработке', style: 'inwork_button'}]
    const [tags, setTags] = React.useState(props.tags);
    const [links, setLinks] = React.useState(props.links)
    const [file, setFile] = React.useState(null)
    const [formOpen, setFormOpen] = React.useState(false);
    const [status, setStatus] = React.useState(props.status);
    const [chatOrHistFlag, setFlag] = React.useState(true);
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


  return (
    <>
    <div id="edit_popup_window">
        <PopupBar />
        <Box sx={{ width: '100%', height: '100%', backgroundColor: '#EDF5FB' }}>
            <Container sx={{backgroundColor:'EDF5FB', overflow:'auto', height:'100%'}}>
                <Stack spacing={2} sx={{backgroundColor:'EDF5FB'}}>
                    <Typography variant="h4" component="h5">{data.object.desc}</Typography>
                        <Stack direction={'row'} spacing={15} justifyContent={'space-between'}>
                            <Typography>Дата создания {data.object.date_created.toLocaleDateString()}</Typography>
                            <Typography>Дата изменения {data.object.date_changed.toLocaleDateString()}</Typography>
                        </Stack>
                        
                    <Grid container spacing={1} alignItems={'flex-start'}>
                        <Grid item xs={3}> 
                            <Typography align='left'>Описание</Typography>
                        </Grid>
                        <Grid item xs={9} textAlign='left'>
                            <TextField 
                            id="standard-textarea"
                            placeholder="Placeholder"
                            sx={{width:'60%'}}
                            multiline
                            defaultValue={data.object.desc}
                            variant="outlined">
                            </TextField>
                        </Grid>

                        <Grid item xs={3}> 
                            <Typography align='left'>Автор</Typography>
                        </Grid>
                        <Grid item xs={9} textAlign='left'>
                            <TextField 
                            id="standard-textarea"
                            placeholder="Placeholder"
                            sx={{width:'60%'}}
                            multiline
                            defaultValue={data.object.author}
                            variant="outlined">
                            </TextField>
                        </Grid>

                        <Grid item xs={3}> 
                            <Typography align='left'>Статус</Typography>
                        </Grid>
                        <Grid item xs={3} textAlign='left'>
                                <TextField  size='small' id="outlined-basic" variant="outlined"  value={status}/>
                        </Grid>
                        <Grid item xs={6}/>
                        
                        <Grid item xs={3}/>
                        <Grid item xs={9} textAlign='left'>
                            <ButtonGroup size='small'>
                                    {statusButtons.map((button) => (
                                        <Button size='small' onClick={() =>changeStatus(button.value)} key={statusButtons.indexOf(button)} disabled={status===button.value}>{button.value}</Button>
                                    ))}
                            </ButtonGroup>
                        </Grid>

                        <Grid item xs={3}> 
                            <Typography align='left'>Тип</Typography>
                        </Grid>
                        <Grid item xs={3} textAlign='left'>
                            <TextField  size='small' id="outlined-basic" variant="outlined"  defaultValue={data.object.type}/>
                        </Grid>
                        <Grid item xs={6} textAlign='left'>
                            <Button size='small' variant='outlined'>Изменить</Button>
                        </Grid>

                        <Grid item xs={3}> 
                            <Typography align='left'>Приоритет</Typography>
                        </Grid>
                        <Grid item xs={3} textAlign='left'>
                            <TextField  size='small' id="outlined-basic" variant="outlined"  defaultValue={data.object.priority}/>
                        </Grid>
                        <Grid item xs={6}/>

                        <Grid item xs={3}> 
                            <Typography align='left'>Вложения</Typography>
                        </Grid>
                        <Grid item xs={6} textAlign='left'>
                            <TextField  size='small' fullWidth id="outlined-basic" variant="outlined"  value={file ? file['name'] : ''} />
                        </Grid>
                        <Grid item xs={3} textAlign='left'>
                            <Button size='small' variant='outlined' onClick={handleButtonClick}>Изменить</Button>
                            <input id='input_epw'type="file"  ref={inputRef} onChange={handleFileChange} style={{display: 'none'}} defaultValue={file ? file['name'] : ''}/>
                        </Grid>  

                        <Grid item xs={3}> 
                            <Typography align='left'>Путь</Typography>
                        </Grid>
                        <Grid item xs={6} textAlign='left'>
                            <TextField  size='small' fullWidth id="outlined-basic" variant="outlined" defaultValue={data.object.path}/>
                        </Grid>
                        <Grid item xs={3} textAlign='left'>
                            <Button size='small'  variant='outlined'>Изменить</Button>
                        </Grid>
                    </Grid>
                </Stack>

                <Container sx={{marginTop:'50px'}}>
                        <Typography onClick={handleOpenForm} align='left'><Add fontSize='large'/>Добавить ссылку</Typography>
                        <Stack direction={'column'} spacing={1} textAlign={'left'} marginLeft={'30px'}>
                            {links.map((link) => (
                                    <Typography  key={links.indexOf(link)} ><a href={link} key={links.indexOf(link)}>{link}</a></Typography>
                                ))}
                        </Stack>
                </Container>
                <Container>
                        <Typography onClick={() => addTags({key: 'Тэг'+(tags.length+1), value: ""})} align='left'><Add fontSize='large'/>Добавить тэг</Typography>
                        <Stack direction={'column'} spacing={1} textAlign={'left'} marginLeft={'30px'}>
                            {tags.map((tag) => (
                                    <Typography  key={tags.indexOf(tag)}  >
                                        {tag.key}
                                        <TextField size='small' defaultValue={tag.value} />
                                    </Typography>
                                ))}
                        </Stack>
                </Container>
                <Container>
                        <Typography align='left'><Add fontSize='large'/>Зависимости</Typography>
                        <Box color={'black'} width={'30px'} height={'30px'}></Box>
                </Container>
                
            </Container>
        </Box>
        <Dialog
        open={formOpen}
        onClose={handleCloseForm}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const link = formJson.link;
            console.log(link);
            addLinks(link);
            handleCloseForm();
          },
        }}
      >  
      <DialogTitle>Редактирование ссылок</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Какую ссылку вы хотите добавить?
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="link"
            label="https://"
            type="string"
            defaultValue={'https://'}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Отмена</Button>
          <Button type="submit">Подтвердить</Button>
        </DialogActions>
      </Dialog>
    </div>
    
    </>
  );
}

export default MuiPopup;