// Кожевников СЮ страница популярных проектов на StartPage

import React from 'react';
import Box from '@mui/material/Box';
import { Button} from '@mui/material';
import useProjects from '../../../hooks/useProjects';
import { tProjectAttributes } from '#/dtos';

type ActiveProjectsProps = {
  changeState: (project: tProjectAttributes | null) => void
}
export default function ActiveProjects({changeState} : ActiveProjectsProps) {
  const {projects, loading, error} = useProjects();
  
  return (

    <Box sx={{ flexGrow: 0}}>
        {loading && <div>Загрузка...</div>}
        {error && <div>Произошла ошибка {error}</div>}
        {!loading && !error && projects.length === 0 && <div>Нет проектов</div>}
        {!loading && !error && projects.length > 0 && projects.sort((a, b) => {
          const aDate = typeof a.dateEdited === "string" ? new Date(a.dateEdited) : a.dateEdited;
          const bDate = typeof b.dateEdited === "string" ? new Date(b.dateEdited) : b.dateEdited;
          return bDate.getTime() - aDate.getTime();
        }).slice(0, 3).map((project) => (
            <div key={project.projectId}>
                <Button variant="text" onClick={() => changeState(project)} > {project.name} </Button>
            </div>
        ))}
        {/* <div><Button variant="text" > АСУ ТП для АЭС МАРС1 </Button></div>
        <div><Button variant="text" > IMS Impulse</Button></div> */}
    </Box>
  );
}
