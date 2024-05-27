// Кожевников СЮ страница о проекте

import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Animation from './animation';
import './colors_styles.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));


function About() {

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // for (var i = 1; i <= 12; i++) {
  //   <div className='div-1 square-" + i + "'>" + i + " </div>
  //        console.log(i); // 1, "string", false
  //   }

    return (
    <React.Fragment>

    <Button
      id="fade-button"
       aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickOpen}>
      О проекте
    </Button>

    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}   >

      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
      О проекте  <Animation />
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>


  <DialogContent dividers>

      <Typography gutterBottom>
        Система управления информацией “Импульс” — это платформа для совместной работы в области системной инженерии, которая обеспечивает взаимодействие между архитектором,
        стейкхолдерами и проектировщиками больших систем, которые формируют связанную модель данных.
        Содежит инструменты для инжиниринга требований и управления конфигурацией, проектирования схем архитектуры и взаимосвязи между ключевыми бизнес-процессами.
        Обеспечивает трассируемость объектов модели данных в течении всего жизненного цикла, с возможностью автогенерации проектных документов.
        </Typography>
        <Typography gutterBottom>
        Является тонким клиентом, для работы с моделью данных проекта в СУБД Postgres.
        </Typography>
      <Typography gutterBottom>

    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header">
          <Typography>Ссылки на ресурсы проекта </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography gutterBottom>
            GitHub проекта <a href='https://github.com/DenSakharov/impuls.git' target="_blank" rel="noreferrer"> Смотреть ... </a>
        </Typography>
        <Typography gutterBottom>
            ER диаграмма базы данных проекта <a href='https://www.figma.com/file/vewdlcyelMrWVBgxarOSlN/DB-diagram?type=whiteboard&node-id=0-1&t=2PxWHLlg8fztJO48-0' target="_blank" rel="noreferrer"> Смотреть ... </a>
        </Typography>
        <Typography gutterBottom>
            Визуальное представление в Figma <a href='https://www.figma.com/file/oMGQxCqr40KSGW0XREpRHE/Макет?type=design&mode=design&t=2PxWHLlg8fztJO48-0' target="_blank" rel="noreferrer">Смотреть ... </a>
       </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"        >
          <Typography>Функции системы </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          1. Авторизация, регистрация, смена пароля на сайте.
          </Typography>
          <Typography>
          2. Профиль пользователя и его роль.
          </Typography>
          <Typography>
          3. Список объектов модели данных проекта в виде структуры (Папки и объекты).
          </Typography>
          <Typography> 4. Карточка объекта с набором полей </Typography>
                {/* <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"        >
                  <Typography> и дополнительным функционалом: </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>- Инструмент параметризации объекта. </Typography>
                <Typography>- Фиксация истории изменений объектов.</Typography>
                <Typography>- Обсуждения объектов модели данных. </Typography>
                <Typography>- Инструмент для трассировки зависимостей объектов. </Typography>
                <Typography>- Инструмент для формирования задач в рамках проработки объекта модели данных. </Typography>
                <Typography>- Поддержка типизации объектов. </Typography>
                </AccordionDetails>
                </Accordion> */}
          <Typography>
          5. Вложение документов в карточку объекта, с возможностью редактирования (без онлайн редакторов, в много пользовательском режиме). Редактировании документа онлайн несколькими пользователями.
          </Typography>
          <Typography>
          6. Простейший инструмент утверждения объекта с блокировкой карточки.
          </Typography>
          <Typography>
          7. Комментарии в виде форума, по каждому объекту
          </Typography>
          <Typography>
          8. Импорт / экспорт через Excel файл списка всех объектов из модели данных проекта.
          </Typography>
          <Typography>
          9. Создание простейшего отчета PDF.
          </Typography>
          <Typography>
          10. Базовые функции управления этапами и задачами проекта.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"        >
          <Typography>Дальнейшее развитие проекта </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>
            1. Интеграция с системой по управлению задачами Jira, Битрикс24 для экспорта задач.
            </Typography>
            <Typography>
            2. Реализация совместимости с Sparx Systems Enterprise Architect (в том числе вывод диаграмм в UML нотации).
            </Typography>
            <Typography>
            3. Реализация настройки скрытия и шифрования данных в соответствии с матрицей доступа.
            </Typography>
        </AccordionDetails>
      </Accordion>

    </div>
    </Typography>
   </DialogContent>
    
   <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Написать отзыв
        </Button>
  </DialogActions>

    </BootstrapDialog>
  </React.Fragment>
);
}

export default About;
