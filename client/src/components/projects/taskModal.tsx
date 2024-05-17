import React from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task?: any;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, task }) => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Form submitted');
        onClose();
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={handleSubmit}>
                <h4>Задача</h4>
                <TextField
                    fullWidth
                    label="Название"
                    defaultValue={task?.name}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Дата начала"
                    type="date"
                    defaultValue={task?.startDate}
                    margin="normal"
                    variant="filled"
                />
                <TextField
                    fullWidth
                    label="Дата окончания"
                    type="date"
                    defaultValue={task?.endDate}
                    margin="normal"
                    variant="filled"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Исполнители</InputLabel>
                    <Select defaultValue={task?.executor} label="Исполнители">
                        <MenuItem value="1">Иванов И.В.</MenuItem>
                        <MenuItem value="2">Петров П.П.</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Приоритет</InputLabel>
                    <Select defaultValue={task?.priority} label="Приоритет">
                        <MenuItem value="high">Высокий</MenuItem>
                        <MenuItem value="medium">Средний</MenuItem>
                        <MenuItem value="low">Низкий</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" color="primary" variant="contained">Сохранить</Button>
                <Button type="button" color="secondary" variant="contained" onClick={onClose} style={{ marginLeft: 8 }}>Отмена</Button>
            </Box>
        </Modal>
    );
};

export default TaskModal;
