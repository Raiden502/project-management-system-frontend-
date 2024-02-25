import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
// utils
import Chart, { useChart } from 'src/components/chart';
import Iconify from 'src/components/iconify/Iconify';

// ----------------------------------------------------------------------

export default function DataActivity({ title, subheader, chart, ...other }) {
    const { labels, colors, series, options } = chart;

    const [seriesData, setSeriesData] = useState('Week');

    const chartOptions = useChart({
        chart: {
            stacked: true,
        },
        colors,
        stroke: {
            width: 0,
        },
        xaxis: {
            categories:
                (seriesData === 'Week' && labels.week) ||
                (seriesData === 'Month' && labels.month) ||
                labels.year,
        },
        tooltip: {
            y: {
                formatter: (value) => value,
            },
        },
        plotOptions: {
            bar: {
                borderRadius: (seriesData === 'Week' && 8) || (seriesData === 'Month' && 6) || 10,
                columnWidth: '20%',
            },
        },
        ...options,
    });

    return (
        <>
            <Card {...other}>
                <CardHeader
                    title={title}
                    subheader={subheader}
                    action={
                        <ButtonBase
                            // onClick={popover.onOpen}
                            sx={{
                                pl: 1,
                                py: 0.5,
                                pr: 0.5,
                                borderRadius: 1,
                                typography: 'subtitle2',
                                bgcolor: 'background.neutral',
                            }}
                        >
                            {seriesData}

                            <Iconify
                                width={16}
                                icon="eva:arrow-ios-downward-fill"
                                sx={{ ml: 0.5 }}
                            />
                        </ButtonBase>
                    }
                />

                {series.map((item) => (
                    <Box key={item.type} sx={{ mt: 3, mx: 3 }}>
                        {item.type === seriesData && (
                            <Chart
                                dir="ltr"
                                type="bar"
                                series={item.data}
                                options={chartOptions}
                                height={364}
                            />
                        )}
                    </Box>
                ))}
            </Card>

            {/* <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
                {series.map((option) => (
                    <MenuItem
                        key={option.type}
                        selected={option.type === seriesData}
                        onClick={() => handleChangeSeries(option.type)}
                    >
                        {option.type}
                    </MenuItem>
                ))}
            </CustomPopover> */}
        </>
    );
}

DataActivity.propTypes = {
    chart: PropTypes.object,
    subheader: PropTypes.string,
    title: PropTypes.string,
};
