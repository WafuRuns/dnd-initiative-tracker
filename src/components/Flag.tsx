import { Box, Grid, Popover, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FlagProps } from "./types";

const Flag = (props: FlagProps) => {
    const [anchorEl, setAnchorEl] = useState<any | null>(null);

    useEffect(() => {
        if (props.turn) {
            handleDecreaseDuration();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.turn]);

    const handleOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = () => {
        if (
            props.index !== undefined &&
            props.innerIndex !== undefined &&
            props.decreaseFlagDuration &&
            props.deleteFlag
        ) {
            if (props.flag?.duration === 1) {
                props.deleteFlag(props.index, props.innerIndex);
            } else {
                props.decreaseFlagDuration(props.index, props.innerIndex);
            }
        }
    };

    const handleRightClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.preventDefault();
        if (
            props.index !== undefined &&
            props.innerIndex !== undefined &&
            props.deleteFlag
        ) {
            props.deleteFlag(props.index, props.innerIndex);
        }
    };

    const handleDecreaseDuration = () => {
        if (
            props.index !== undefined &&
            props.innerIndex !== undefined &&
            props.decreaseFlagDuration
        ) {
            props.decreaseFlagDuration(props.index, props.innerIndex);
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? "flag-popover" : undefined;

    return (
        <Grid
            aria-describedby={id}
            item
            xs={1}
            sx={{
                backgroundColor: props.flag?.color,
            }}
            onClick={handleClick}
            onContextMenu={handleRightClick}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
        >
            <Popover
                id={id}
                sx={{
                    pointerEvents: "none",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6">{props.flag?.name}</Typography>
                    <Typography variant="body1">
                        Remaining rounds: {props.flag?.duration}
                    </Typography>
                </Box>
            </Popover>
        </Grid>
    );
};

export default Flag;
