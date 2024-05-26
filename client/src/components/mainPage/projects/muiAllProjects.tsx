//Kожевников СЮ вывод всех проектов
import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, Typography, Container, Box, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddProjectsModal from "./createProjects";
import EditProjectsModal from "./editProjects";
import '../styles/muiNews.scss';
import axios from 'axios';

// Поля таблицы t_project
    // projectId: UUID
    // name: string
    // notes: string
    // status: string
    // imsGuid: string
    // dateEdited: Date
    // dateCreated: Date

    // {
    //     "projectId": "d97a9e36-b48d-4ff2-9363-03f8c7ed8c1c",
    //     "name": "Project1",
    //     "notes": "Description",
    //     "status": "Ready",
    //     "imsGuid": null,
    //     "dateCreated": "2024-05-21T09:22:35.942Z",
    //     "dateEdited": "2024-05-21T09:22:35.942Z"
    // },


interface projectsItem {
    projectId: string;
    status: string;
    name: string;
    notes: string;
    userid: string | null;
}

const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength)
        return content;
    const truncated = content.substr(0, maxLength);
    return truncated.substr(0, truncated.lastIndexOf(' ')) + '...';
};

const MuiAllProjects: React.FC = () => {
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [currentProjectsUpdate, setCurrentProjectsUpdate] = useState(null);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalItem, setShowModalItem] = useState(false);
    const [ProjectsData, setProjectsData] = useState<projectsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProjects, setSelectedProjects] = useState<projectsItem | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ProjectsPerPage = 10; // Number of projects items per page

    // Загрузка списка проектов
    const fetchProjectsData = async () => {
        try {
            const response = await fetch(`http://${window.location.hostname.toString()}:3010/projects`);
            //console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
                // console.log(response);
            }
            const data = await response.json();
            setProjectsData(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };
    // load news list
    useEffect(() => {
        fetchProjectsData();
    }, []);

    // Get current Projects for the page
    const indexOfLastProjects= currentPage * ProjectsPerPage;
    const indexOfFirstProjects = indexOfLastProjects - ProjectsPerPage;
    const currentProjects = ProjectsData.slice(indexOfFirstProjects, indexOfLastProjects);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // edit/delete Projects
    const handleProjectsEditClick = (projectsItem) => {
        setCurrentProjectsUpdate(projectsItem);
        setShowModalUpdate(true);
    };

    const handleProjectsDeleteClick = async (projectId) => {
        await axios.delete(`http://${window.location.hostname.toString()}:3010/projects/${projectId}`);
        fetchProjectsData();
    };

    // popup with sinlge projects
    const handleOpenModalProjects = (projects: projectsItem) => {
        setSelectedProjects(projects);
        setShowModalItem(true);
    };

    const handleCloseModalProjects = () => {
        setShowModalItem(false);
        setSelectedProjects(null);
    };

    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
        setCurrentProjectsUpdate(null);
        fetchProjectsData();
    };

    const handleCloseModalCreate = () => {
        setShowModalCreate(false);
        fetchProjectsData();
    };

    // load projects list
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container>
            {currentProjects.map((projects) => (
                <Card key={projects.projectId} style={{ marginBottom: '20px' }}>
                    <CardActions style={{ marginBottom: '-50px' }}>
                        <IconButton
                            aria-label="edit"
                            onClick={() => handleProjectsEditClick(projects)}
                            style={{ marginLeft: 'auto' }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            onClick={() => handleProjectsDeleteClick(projects.projectId)}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {projects.name}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            {/* {new Date(projects.dateCreated).toLocaleDateString()} */}
                            {projects.status}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {truncateContent(projects.notes, 200)}
                        </Typography>
                    </CardContent>
                    <Box display="flex" justifyContent="flex-end" padding="16px">
                        <Button onClick={() => handleOpenModalProjects(projects)}>Подробнее</Button>
                    </Box>
                </Card>
            ))}

            {/* Pagination buttons */}
            <Box display="flex" justifyContent="space-between" alignItems="center" marginY="20px">
                <Box>
                    {Array.from({ length: Math.ceil(ProjectsData.length / ProjectsPerPage) }, (_, i) => (
                        <Button key={i + 1} onClick={() => paginate(i + 1)}>{i + 1}</Button>
                    ))}
                </Box>
                <Button variant="contained" color="primary" onClick={() => setShowModalCreate(true)}>+</Button>
            </Box>
            {showModalCreate && <AddProjectsModal onClose={handleCloseModalCreate} />}
            {showModalUpdate && <EditProjectsModal open={showModalUpdate} projectsItem={currentProjectsUpdate} onClose={handleCloseModalUpdate} />}

            <Modal open={showModalItem} onClose={handleCloseModalProjects}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    maxHeight: '80vh',
                    overflow: 'auto'
                }}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModalProjects}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    ><CloseIcon />
                    </IconButton>
                    {selectedProjects && (
                        <>
                            <Typography variant="h6" component="h2">
                                {selectedProjects.name}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                {selectedProjects.notes}
                            </Typography>
                        </>
                    )}
                </Box>
            </Modal>
        </Container>
    );
};

export default MuiAllProjects;
