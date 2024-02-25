import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Stack, Typography, Button, Paper } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import TaskItem from './task-items';

export default function TaskColumn({ column, index, AddNewRow }) {
    return (
        <Draggable draggableId={`${column.index}`} index={column.index} key={column.index}>
            {(provided) => (
                <Paper
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    sx={{
                        background: '#f4f6f8',
                        p: 2,
                        borderRadius: '16px',
                        minWidth: '315px',
                    }}
                >
                    <Stack {...provided.dragHandleProps}>
                        <Typography variant="subtitle1" sx={{}} gutterBottom>
                            {column.name}
                        </Typography>
                        <Droppable droppableId={column.id} type="TASK">
                            {(dropProvided) => (
                                <Stack
                                    {...dropProvided.droppableProps}
                                    ref={dropProvided.innerRef}
                                    spacing={2}
                                    sx={{ width: 280, py: 3 }}
                                >
                                    {column.value.map((item, index2) => (
                                        <TaskItem item={item} key={item.index} index={item.index} />
                                    ))}
                                    {dropProvided.placeholder}
                                </Stack>
                            )}
                        </Droppable>
                        <Button
                            fullWidth
                            size="large"
                            color="inherit"
                            startIcon={
                                <Iconify icon="mingcute:add-line" width={18} sx={{ mr: -0.5 }} />
                            }
                            onClick={() => {
                                AddNewRow(column.index);
                            }}
                            sx={{ fontSize: 14 }}
                        >
                            Add Task
                        </Button>
                    </Stack>
                </Paper>
            )}
        </Draggable>
    );
}
