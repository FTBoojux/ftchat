import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

export default function CircularProgressWithLabel(props){
    console.log(props);
    
    return (
        <Box 
            sx={{ 
                position: 'relative', 
                display: 'inline-flex' 
                }}
                >
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {/* 向下取整 */}
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}