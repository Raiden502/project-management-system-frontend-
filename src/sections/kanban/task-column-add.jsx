import { useState, useCallback, useContext } from 'react';
// @mui
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { inputBaseClasses } from '@mui/material/InputBase';
import ClickAwayListener from '@mui/material/ClickAwayListener';
// hooks

import Iconify from 'src/components/iconify/Iconify';
import { useKanban } from './hooks';
import { useBoolean } from 'src/utils/use-boolean';
import { AuthContext } from 'src/auth/JwtContext';

// ----------------------------------------------------------------------

export default function TaskColumnAdd() {
    const { onCreateColumn } = useKanban();
    const { user } = useContext(AuthContext);

    const [name, setName] = useState('');

    const addSection = useBoolean();

    const handleChangeColumnName = useCallback((event) => {
        setName(event.target.value);
    }, []);

    const handleCreateColumn = useCallback(async () => {
        try {
            if (name) {
                onCreateColumn({ name });
                setName('');
            }
            addSection.onFalse();
        } catch (error) {
            console.error(error);
        }
    }, [addSection, name, onCreateColumn]);

    const handleKeyUp = useCallback(
        (event) => {
            if (event.key === 'Enter') {
                handleCreateColumn();
            }
        },
        [handleCreateColumn]
    );

    return (
        <Paper sx={{ minWidth: 280, width: 280 }}>
            {addSection.value ? (
                <ClickAwayListener onClickAway={handleCreateColumn}>
                    <TextField
                        autoFocus
                        fullWidth
                        placeholder="New section"
                        value={name}
                        onChange={handleChangeColumnName}
                        onKeyUp={handleKeyUp}
                        sx={{
                            [`& .${inputBaseClasses.input}`]: {
                                typography: 'h6',
                            },
                        }}
                    />
                </ClickAwayListener>
            ) : (
                <Button
                    fullWidth
                    size="large"
                    color="inherit"
                    variant="outlined"
                    startIcon={<Iconify icon="mingcute:add-line" sx={{ mr: -0.5 }} />}
                    onClick={addSection.onTrue}
                    disabled={user.role==='user'}
                >
                    Add Stages
                </Button>
            )}
        </Paper>
    );
}
