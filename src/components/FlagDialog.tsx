import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputBaseComponentProps,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import React, { useState } from "react";
import { FlagColors, FlagColorsKey, FlagDialogProps } from "./types";

const numericInputProps: InputBaseComponentProps = {
    style: {
        textAlign: "center",
    },
};

const FlagDialog = React.memo((props: FlagDialogProps) => {
    const [flag, setFlag] = useState<string>("Blinded");
    const [customFlag, setCustomFlag] = useState<string>("");
    const [color, setColor] = useState<string>("#000000");
    const [duration, setDuration] = useState<number>(1);

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleApply = () => {
        if (props.addFlag && props.index !== undefined) {
            if (customFlag !== "") {
                props.addFlag(
                    customFlag,
                    props.turn ? duration + 2 : duration,
                    color as string,
                    props.index
                );
            } else {
                const flagColor: string =
                    color !== "#000000"
                        ? color
                        : FlagColors[flag.replace(" ", "") as FlagColorsKey];
                props.addFlag(
                    flag,
                    props.turn ? duration + 2 : duration,
                    flagColor,
                    props.index
                );
            }
        }
        setFlag("Blinded");
        setCustomFlag("");
        setColor("#000000");
        setDuration(1);
        props.setOpen(false);
    };

    const handleChangeFlag = (e: SelectChangeEvent) => {
        setFlag(e.target.value);
    };

    const handleCustomFlagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomFlag(e.target.value);
    };

    const handleChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(parseInt(e.target.value) || 0);
    };

    const handleColorChange = (c: string) => {
        setColor(c);
    };

    return (
        <Dialog open={props.open} onClose={handleClose} fullWidth>
            <DialogTitle>Choose flags</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    direction="row"
                    spacing={2}
                    sx={{ fontSize: 14 }}
                >
                    <Grid item xs={8}>
                        <FormControl fullWidth>
                            <InputLabel id="flag-select-label">Flag</InputLabel>
                            <Select
                                labelId="flag-select-label"
                                id="flag-select"
                                value={flag}
                                onChange={handleChangeFlag}
                                label="Flag"
                            >
                                <MenuItem value="Blinded">Blinded</MenuItem>
                                <MenuItem value="Deafened">Deafened</MenuItem>
                                <MenuItem value="Frightened">
                                    Frightened
                                </MenuItem>
                                <MenuItem value="Invisible">Invisible</MenuItem>
                                <MenuItem value="Petrified">Petrified</MenuItem>
                                <MenuItem value="Restrained">
                                    Restrained
                                </MenuItem>
                                <MenuItem value="Charmed">Charmed</MenuItem>
                                <MenuItem value="Drunk">Drunk</MenuItem>
                                <MenuItem value="Grappled">Grappled</MenuItem>
                                <MenuItem value="On Fire">On Fire</MenuItem>
                                <MenuItem value="Poisoned">Poisoned</MenuItem>
                                <MenuItem value="Stunned">Stunned</MenuItem>
                                <MenuItem value="Concentration">
                                    Concentration
                                </MenuItem>
                                <MenuItem value="Incapacitated">
                                    Incapacitated
                                </MenuItem>
                                <MenuItem value="Paralyzed">Paralyzed</MenuItem>
                                <MenuItem value="Prone">Prone</MenuItem>
                                <MenuItem value="Unconscious">
                                    Unconscious
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Duration"
                            value={duration}
                            onChange={handleChangeDuration}
                            type="number"
                            fullWidth
                            inputProps={{ ...numericInputProps }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            label="Custom Flag"
                            value={customFlag}
                            onChange={handleCustomFlagChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <MuiColorInput
                            label="Color"
                            value={color}
                            onChange={handleColorChange}
                            format="hex"
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleApply}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
});

export default FlagDialog;
