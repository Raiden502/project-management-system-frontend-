import {
    Avatar,
    Box,
    Card,
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
    InputAdornment,
    Stack,
    TablePagination,
    Switch,
    FormControlLabel,
} from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import Label from 'src/components/label';

const headCells = [
    {
        id: 'name',
        align: 'left',
        label: 'Name',
    },
    {
        id: 'email',
        align: 'left',
        label: 'Email',
    },
    {
        id: 'department',
        align: 'left',
        label: 'Department',
    },
    {
        id: 'role',
        align: 'left',
        label: 'Role',
    },
    {
        id: 'status',
        align: 'left',
        label: 'Status',
    },
];

const DataCell = [
    {
        userid: 1,
        name: 'name',
        email: 'name@gmail.com',
        avatar: '',
        department: 'department-1',
        role: 'admin',
        status: 'active',
    },
    {
        userid: 2,
        name: 'name',
        email: 'name@gmail.com',
        avatar: '',
        department: 'department-1',
        role: 'admin',
        status: 'active',
    },
    {
        userid: 3,
        name: 'name',
        email: 'name@gmail.com',
        avatar: '',
        department: 'department-1',
        role: 'admin',
        status: 'pending',
    },
];

export default function TaskListView() {
    return (
        <Box
            component={Card}
            sx={{
                borderRadius: '15px',
                boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px',
            }}
        >
            <Stack p={3} gap={3} direction="row">
                <TextField
                    name="role"
                    label="Role"
                    type="text"
                    sx={{ height: '50px' }}
                    InputProps={{
                        sx: { borderRadius: '8px' },
                    }}
                />
                <TextField
                    name="search"
                    placeholder="Search ..."
                    type="text"
                    sx={{ height: '50px' }}
                    fullWidth
                    InputProps={{
                        sx: { borderRadius: '8px' },
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="ic:round-search" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            <TableContainer>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f9f9f9' }}>
                        <TableRow>
                            <TableCell sx={{ border: 'none' }}>
                                <Checkbox checked onClick={() => {}} />
                            </TableCell>
                            {headCells.map((item) => (
                                <TableCell key={item.id} align={item.align} sx={{ border: 'none' }}>
                                    <Typography variant="body2" fontWeight="">
                                        {item.label}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {DataCell.map((item, index) => (
                            <TableRow
                                key={item.userid}
                                hover
                                sx={{
                                    borderBottom:
                                        index < DataCell.length - 1 ? '1px dashed grey' : 'none',
                                }}
                            >
                                <TableCell sx={{ border: 'none' }}>
                                    <Checkbox checked onClick={() => {}} />
                                </TableCell>
                                <TableCell
                                    sx={{ display: 'flex', alignItems: 'center', border: 'none' }}
                                >
                                    <Avatar alt={item.name} src={item.avatar} sx={{ mr: 2 }} />
                                    {item.name}
                                </TableCell>
                                <TableCell sx={{ border: 'none' }}>{item.email}</TableCell>
                                <TableCell sx={{ border: 'none' }}>{item.department}</TableCell>
                                <TableCell sx={{ border: 'none' }}>{item.role}</TableCell>
                                <TableCell sx={{ border: 'none' }}>
                                    <Label
                                        variant="soft"
                                        color={
                                            (item.status === 'active' && 'success') ||
                                            (item.status === 'pending' && 'warning') ||
                                            (item.status === 'banned' && 'error') ||
                                            'default'
                                        }
                                    >
                                        <Typography variant="body2" fontSize={12} fontWeight="bold">
                                            {item.status}
                                        </Typography>
                                    </Label>
                                </TableCell>
                                <TableCell sx={{ border: 'none' }}>
                                    <IconButton onClick={() => {}}>
                                        <Iconify icon="eva:more-vertical-fill" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    p: 3,
                }}
            >
                <FormControlLabel control={<Switch checked onChange={() => {}} />} label="Dense" />
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={DataCell.length}
                    rowsPerPage={5}
                    page={10}
                    // onPageChange={handleChangePage}
                    // onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
}
