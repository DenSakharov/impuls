import React from 'react';
import { Box, Button, MenuItem, Container, Grid, Stack, TextField, Typography, Divider, IconButton, Select } from '@mui/material';
import { Add, ArrowDropDownCircle, AssignmentOutlined } from '@mui/icons-material';
import { ThemeProvider } from '@emotion/react';
import { v4 as uuidV4 } from 'uuid';
import impulsTheme from '../../muiTheme';
import SuccessAlert from './successAlert';
import EditPopupProps from '../interfaces/editPopupProps';
import PopupBar from './popupBar';
import ApprovalDialog from './approvalDialog';
import AddLinkDialog from './addLinkDialog';
import data from '../editPopup/data';
import axios from 'axios'




export default function MuiPopup(props: EditPopupProps = data.object) {
    axios.headers.common['Authorization'] = `Bearer ${props.token}`
    axios.get(         
        window.location.origin + '/documents/' + '06858a60-0059-41e4-9c88-963af22dc754'
    )
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))

    const docType = ['Основной документ', 'Дополнительный документ', 'Технический документ']
    const authors = ['Красненков Илья', 'Кожевников Сергей', 'Жарков Андрей', 'Макшанова Алла']
    const statusButtons = [{value: 'На утверждение', style: 'accept_offer_button'},
                           {value: 'На доработку', style: 'rework_button'},
                           {value: 'Утвердить', style: 'accept_button'},
                           {value: 'В разработке', style: 'inwork_button'}]
    const priorities = ['Высокий', 'Средний', 'Низкий']
    const [tags, setTags] = React.useState(props.tags);
    const [links, setLinks] = React.useState(props.links)
    const [file, setFile] = React.useState(null)
    const [formOpenLink, setFormOpenLink] = React.useState(false);
    const [formApproval, setFormApproval] = React.useState(false);
    const [status, setStatus] = React.useState(props.status);
    const [docTypeValue, setDocTypeValue] = React.useState(props.type);
    const [attachments, setAttachments] = React.useState<{uuid: string}[]>([]);
    const [author, setAuthor] = React.useState(props.author);
    const [priority, setPriority] = React.useState(props.priority);
    const [showAlert, setShowAlert] = React.useState(false);
    const [userApprove, setApproveUser] = React.useState('');

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
    const handleAddAttachment = () => {
        const newUUID = uuidV4()
        window.open('/documents/'+ newUUID)
        if (newUUID) {
            setAttachments([...attachments, {uuid: newUUID}]);
        }
        
    };

    const handleOpenAttachment = (uuid: string) => {
        window.open('/documents/'+ uuid)
    }

    const handleAlert = (value: string) => {
        setApproveUser(value)
        setShowAlert(true)
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
        height: {xs: window.innerHeight, lg: 800},
        display:'flex',
        flexDirection: 'column',
        overflow: 'auto',
    }}>
        <PopupBar {...props} />
        <Container sx={{backgroundColor:'#EDF5FB', overflow:'auto', height:'100%', 
                '&::-webkit-scrollbar': {
                    width: '5px'
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: '#147ccc00'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#157298',
                    outline: '1px solid slategrey',
                    borderRadius: '10px',
                    border: '0.1px solid #00000041'
                }
            }}>
                <Stack spacing={2} sx={{backgroundColor:'EDF5FB'}}>
                    <Container disableGutters  sx={{paddingTop:'10px', display:'flex', flexDirection:{xs:'column', md:'row'}, alignItems:'flex-start'}}>
                        <Typography variant='h5' style={{wordWrap: 'break-word'}} >{props.name}</Typography>
                        <Button sx={{marginLeft:{md:'auto', xs:'0'}, minWidth:'150px'}} variant='outlined' onClick={() => setFormApproval(true)}>Отправить на согласование</Button>
                    </Container>
                        <Stack direction={'row'} spacing={10}  display={'flex'} flex={'flex-start'}>
                            <Typography>Дата создания {props.date_created?.toLocaleDateString()}</Typography>
                            <Typography>Дата изменения {props.date_changed?.toLocaleDateString()}</Typography>
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
                            defaultValue={props.desc}                            
                            variant="outlined">
                            </TextField>
                        </Grid>
                        <Grid item md={mdGridSpace} xs={0}/>

                        <Grid item md={mdGridName} xs={smGridName}> 
                            <Typography align='left'>Автор</Typography>
                        </Grid>
                        <Grid item md={mdGridValue-2} xs={smGridValue-3} textAlign='left'>
                        <Select size='small' id="outlined-basic" variant="outlined" sx={{minWidth: 120}} value={author? author : ''}  onChange={(e) => setAuthor(e.target.value)}>
                                    {authors.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}    
                                </Select>
                        </Grid>
                        <Grid item md={mdGridSpace+2} xs={mdGridSpace-3}/>

                        <Grid item md={mdGridName} xs={smGridName}> 
                            <Typography align='left'>Статус</Typography>
                        </Grid>
                        <Grid item md={mdGridValue-3} xs={smGridValue-3} textAlign='left'>
                                <Select size='small' id="outlined-basic" variant="outlined" sx={{minWidth: 120}} value={status? status : ''}  onChange={(e) => setStatus(e.target.value)}>
                                    {statusButtons.map((status) => <MenuItem key={status.value} value={status.value}>{status.value}</MenuItem>)}    
                                </Select>
                        </Grid>                            
                            <Grid item md={mdGridSpace+3} xs={12} textAlign='left'>                            
                        </Grid>

                        <Grid item md={mdGridName} xs={smGridName}> 
                            <Typography align='left'>Тип</Typography>
                        </Grid>
                        <Grid item md={mdGridValue-2} xs={smGridValue-3} textAlign='left'>
                            <Select size='small' id="outlined-basic" variant="outlined" sx={{minWidth: 120}}  value={docTypeValue? docTypeValue : ''}  onChange={(e) => setDocTypeValue(e.target.value)}>
                                    {docType.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}    
                                </Select>
                        </Grid>
                        <Grid item md={mdGridSpace+2} xs={4} textAlign='left'>
                            
                        </Grid>

                        <Grid item md={mdGridName} xs={smGridName}> 
                            <Typography align='left'>Приоритет</Typography>
                        </Grid>
                        <Grid item md={mdGridValue-3} textAlign='left' xs={smGridValue-3}>
                            <Select size='small' id="outlined-basic" variant="outlined" sx={{minWidth: 120}}  value={priority? priority : ''}  onChange={(e) => setPriority(e.target.value)}>
                                    {priorities.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}    
                                </Select>
                        </Grid>
                        <Grid item md={mdGridSpace+3} xs={4}/>

                        

                        <Grid item md={mdGridName} xs={smGridName}> 
                            <Typography align='left'>Путь</Typography>
                        </Grid>
                        <Grid item md={mdGridValue} textAlign='left' xs={smGridValue-3}>
                            <TextField  size='small' fullWidth id="outlined-basic" variant="outlined" defaultValue={props.path}/>

                        </Grid>
                        <Grid item md={mdGridSpace} textAlign='left' xs={4}>
                            <Button  size='small'  variant='outlined'>Изменить</Button>
                        </Grid>

                        <Grid item md={mdGridName} xs={smGridName}> 
                            <Typography align='left'>Вложения</Typography>
                        </Grid>
                        <Grid item md={mdGridValue} textAlign='left' xs={smGridValue-3}>
                            <Box sx={{
                                borderRadius:'5px', border: '1px solid rgb(133,133,133,0.5)', padding: '5px',
                                minHeight: '40px'
                            }}>
                                {attachments.map((attachment) => 
                                <IconButton 
                                
                                key={attachment.uuid}
                                onClick={() => handleOpenAttachment(attachment.uuid)}                                                                     
                                sx={{borderRadius:'5px', border: 'initial', margin: '2px'}}>
                                    <AssignmentOutlined />
                                    <Typography sx={{color: 'black'}}>{attachment.uuid.slice(0, 8)}</Typography>
                                </IconButton> )}                                                                            
                            </Box>
                        </Grid>
                        <Grid item md={mdGridSpace} textAlign='left' xs={4}>
                            <Button size='small' variant='outlined' onClick={handleAddAttachment}>Добавить</Button>
                            <input id='input_epw' type="file"  ref={inputRef} onChange={handleFileChange} style={{display: 'none'}} defaultValue={file ? file['name'] : ''}/>
                        </Grid>  
                    </Grid>
                </Stack>

                <Container sx={{marginTop:'50px'}}>
                        <Button onClick={()=>setFormOpenLink(true)} sx={{display:'flex', margin:'10px'}}><Add fontSize='large'/>Добавить ссылку</Button>
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
        <AddLinkDialog 
        formOpen={formOpenLink} 
        handleCloseForm={()=>setFormOpenLink(false)} 
        addLinks={addLinks} />
        <ApprovalDialog
        formOpen={formApproval}
        handleCloseForm={()=>setFormApproval(false)}
        setApproveUser={handleAlert}
        />
        <SuccessAlert user={userApprove} showAlert={showAlert} setShowAlert={setShowAlert}/>
    </Container>
</ThemeProvider>
</>
  );
}