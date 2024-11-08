import PropTypes from 'prop-types';
import { useRef, useState, useEffect, useCallback, useContext } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify/Iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from 'src/utils/use-boolean'; 
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import TaskInputName from './task-input-name'
import { AuthContext } from 'src/auth/JwtContext';
// ----------------------------------------------------------------------

export default function TaskColumnToolBar({ columnName, onDelete, onUpdate }) {
    const renameRef = useRef(null);
    const { user } = useContext(AuthContext);

    const [value, setValue] = useState(columnName);

    const confirm = useBoolean();

    const popover = usePopover();

    useEffect(() => {
        if (popover.open) {
            if (renameRef.current) {
                renameRef.current.focus();
            }
        }
    }, [popover.open]);

    const handleChangeColumnName = useCallback((event) => {
        setValue(event.target.value);
    }, []);

    const handleUpdateColumn = useCallback(
        (event) => {
            if (event.key === 'Enter') {
                if (renameRef.current) {
                    renameRef.current.blur();
                }
                onUpdate(value);
            }
        },
        [onUpdate, value]
    );

    return (
        <>
            <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ pt: 3 }}
            >
                <TaskInputName
                    inputRef={renameRef}
                    placeholder="Section name"
                    value={value}
                    disabled={value==="Done" || user.role==='user'}
                    onChange={handleChangeColumnName}
                    onKeyUp={handleUpdateColumn}
                />

                <IconButton color={popover.open ? 'inherit' : 'default'} disabled={columnName==="Done"} onClick={popover.onOpen}>
                    <Iconify icon="eva:more-horizontal-fill" />
                </IconButton>
            </Stack>

            <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                sx={{
                    ml: 1.5,
                    width: 160,
                }}
            >
                <MenuItem
                    onClick={() => {
                        confirm.onTrue();
                        popover.onClose();
                    }}
                    sx={{ color: 'error.main' }}
                    disabled={user.role==='user'}
                >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    Delete
                </MenuItem>

                <MenuItem onClick={popover.onClose} disabled={user.role==='user'}>
                    <Iconify icon="solar:pen-bold" />
                    Rename
                </MenuItem>
            </CustomPopover>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content={
                    <>
                        Are you sure want to delete column?
                        <Box sx={{ typography: 'caption', color: 'error.main', mt: 2 }}>
                            <strong> NOTE: </strong> All tasks related to this category will also be
                            deleted.
                        </Box>
                    </>
                }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            onDelete();
                            confirm.onFalse();
                        }}
                    >
                        Delete
                    </Button>
                }
            />
        </>
    );
}

TaskColumnToolBar.propTypes = {
    columnName: PropTypes.string,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
};
