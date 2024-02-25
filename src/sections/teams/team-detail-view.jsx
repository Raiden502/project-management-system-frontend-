import {
    Box,
    Button,
    Card,
    IconButton,
    ListItemText,
    Stack,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import FullDetailsView from './full-details-view';
import CandidateDetails from './candidate-details';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function TeamDetailsView() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    sx={{
                        textAlign: 'right',
                    }}
                    startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
                >
                    <Typography variant="body2">Back</Typography>
                </Button>
                <Stack direction="row" gap={3}>
                    <IconButton>
                        <Iconify icon="solar:pen-bold" />
                    </IconButton>
                    <Button
                        variant="contained"
                        endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                    >
                        <Typography variant="body2">Publish</Typography>
                    </Button>
                </Stack>
            </Stack>
            <Box sx={{ mt: 3 }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab
                        label={<Typography variant="subtitle2">Project Content</Typography>}
                        key={0}
                    />
                    <Tab label={<Typography variant="subtitle2">Candidates</Typography>} key={1} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <FullDetailsView />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <CandidateDetails />
            </CustomTabPanel>
        </>
    );
}
