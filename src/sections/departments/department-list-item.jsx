// @mui
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// components
import Iconify from 'src/components/iconify/Iconify';
import { RouterLink } from 'src/routes/components';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useSnackbar } from 'src/components/snackbar';
import { useBoolean } from 'src/utils/use-boolean';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'src/auth/JwtContext';
import axiosInstance from 'src/utils/axios';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function DepartmentItem({ department, access }) {
    const popover = usePopover();
    const confirm = useBoolean();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const {
        name,
        created_date,
        description,
        department_id,
        avatar,
        project_count,
        task_count,
        teams_count,
        user_id,
        users_count,
        associate_user,
        last_modified,
    } = department;

    const editDepartment = (departmentId) => {
        navigate('/dashboard/departments/create', {
            state: { departmentId },
        });
    };

    const detailsDepartment = (departmentId) => {
        navigate('/dashboard/departments/details', {
            state: { departmentId },
        });
    };

    const delete_dept = async () => {
        try {
            const response = await axiosInstance.post('/dept/dept_delete', {
                dept_id: department_id,
            });
            const { errorcode, status, message } = response.data;
            if (errorcode === 0) {
                enqueueSnackbar('delete successful', { variant: 'success' });
            } else {
                enqueueSnackbar('delete unsuccesful', { variant: 'warning' });
            }
        } catch (err) {
            enqueueSnackbar('Failed to delete', { variant: 'error' });
        } finally {
            confirm.onFalse();
        }
    };

    return (
        <>
            <Card sx={{ width: 360, position: 'relative' }}>
                <IconButton
                    onClick={popover.onOpen}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <Iconify icon="eva:more-vertical-fill" />
                </IconButton>

                <Stack sx={{ p: 3, pb: 2 }}>
                    <Avatar
                        alt={'department'}
                        src={avatar}
                        variant="rounded"
                        sx={{ width: 48, height: 48, mb: 2 }}
                    />

                    <ListItemText
                        sx={{ mb: 1 }}
                        primary={
                            <Link
                                component={RouterLink}
                                // href={paths.dashboard.department.details(id)}
                                color="inherit"
                                underline="none"
                            >
                                {name}
                            </Link>
                        }
                        secondary={`Posted date: ${created_date}`}
                        primaryTypographyProps={{
                            typography: 'subtitle1',
                            fontWeight: 600,
                            textDecoration: 'none',
                        }}
                        secondaryTypographyProps={{
                            mt: 1,
                            component: 'span',
                            typography: 'caption',
                            color: 'text.disabled',
                        }}
                    />

                    <Box
                        sx={{
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                        }}
                    >
                        <Typography variant="body1">{description}</Typography>
                    </Box>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
                    {[
                        {
                            label: `${teams_count} team size`,
                            icon: (
                                <Iconify
                                    width={16}
                                    icon="ph:microsoft-teams-logo"
                                    sx={{ flexShrink: 0 }}
                                />
                            ),
                        },
                        {
                            label: `${users_count} candidates`,
                            icon: (
                                <Iconify
                                    width={16}
                                    icon="solar:users-group-rounded-bold"
                                    sx={{ flexShrink: 0 }}
                                />
                            ),
                        },
                        {
                            label: `${task_count} tasks`,
                            icon: (
                                <Iconify
                                    width={16}
                                    icon="lets-icons:subttasks"
                                    sx={{ flexShrink: 0 }}
                                />
                            ),
                        },
                        {
                            label: `${project_count} projects`,
                            icon: (
                                <Iconify
                                    width={16}
                                    icon="fluent:status-20-filled"
                                    sx={{ flexShrink: 0 }}
                                />
                            ),
                        },
                    ].map((item) => (
                        <Stack
                            key={item.label}
                            spacing={1}
                            flexShrink={0}
                            direction="row"
                            alignItems="center"
                            sx={{ color: 'text.disabled', minWidth: 1 }}
                        >
                            {item.icon}
                            <Typography variant="caption" noWrap>
                                {item.label}
                            </Typography>
                        </Stack>
                    ))}
                </Box>
            </Card>
            <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                arrow="right-top"
                sx={{ width: 180 }}
            >
                <MenuItem
                    disabled={
                        user.role === 'user' ||
                        !access.includes(department_id)
                    }
                    onClick={() => {
                        popover.onClose();
                        editDepartment(department_id);
                    }}
                >
                    <Iconify icon="solar:pen-bold" />
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        popover.onClose();
                        detailsDepartment(department_id);
                    }}
                >
                    <Iconify icon="clarity:details-solid" />
                    Details
                </MenuItem>
                <MenuItem
                    disabled={
                        user.role === 'user' ||
                        !access.includes(department_id)
                    }
                    onClick={() => {
                        popover.onClose();
                        confirm.onTrue();
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    Delete
                </MenuItem>
            </CustomPopover>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content="Are you sure want to delete?"
                action={
                    <Button variant="contained" color="error" onClick={delete_dept}>
                        Delete
                    </Button>
                }
            />
        </>
    );
}

DepartmentItem.propTypes = {
    department: PropTypes.object,
};
