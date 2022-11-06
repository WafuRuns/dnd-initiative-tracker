import {
    Grid,
    IconButton,
    InputBaseComponentProps,
    Paper,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import { CreatureProps } from "./types";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import FlagIcon from "@mui/icons-material/Flag";
import FlagDialog from "./FlagDialog";
import Flags from "./Flags";

const numericInputProps: InputBaseComponentProps = {
    style: {
        textAlign: "center",
    },
};

const Creature = React.memo((props: CreatureProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.setName && props.index !== undefined) {
            props.setName(e.target.value, props.index);
        }
    };

    const handleNumericChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        func?: (value: number, index: number) => void
    ) => {
        if (func && props.index !== undefined) {
            func(parseInt(e.target.value) || 0, props.index);
        }
    };

    const handleHPMod = () => {
        if (props.setHP && props.setTemporaryHP && props.index !== undefined) {
            if (props.receiveDamage === 0) {
                return;
            }
            if (props.receiveDamage > 0) {
                const newHP = props.HP + props.receiveDamage;
                props.setHP(
                    newHP > props.maxHP ? props.maxHP : newHP,
                    props.index
                );
            } else {
                const remaining = props.temporaryHP + props.receiveDamage;
                if (remaining < 0) {
                    props.setTemporaryHP(0, props.index);
                    props.setHP(props.HP + remaining, props.index);
                } else {
                    props.setTemporaryHP(remaining, props.index);
                }
            }
        }
    };

    return (
        <Paper
            elevation={2}
            sx={props.turn ? { backgroundColor: "rgb(235, 235, 235)" } : null}
        >
            <FlagDialog
                open={open}
                setOpen={setOpen}
                addFlag={props.addFlag}
                index={props.index}
                turn={props.turn}
            />
            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                paddingBottom={2}
            >
                <Grid item xs={1}>
                    <TextField
                        label="Initiative"
                        value={props.initiative}
                        type="number"
                        onChange={(e) => {
                            handleNumericChange(e, props.setInitiative);
                        }}
                        fullWidth
                        inputProps={{ ...numericInputProps }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Name"
                        value={props.name}
                        onChange={handleNameChange}
                        fullWidth
                        size="small"
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="HP"
                        value={props.HP}
                        type="number"
                        onChange={(e) => {
                            handleNumericChange(e, props.setHP);
                        }}
                        fullWidth
                        inputProps={{ ...numericInputProps }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="Max HP"
                        value={props.maxHP}
                        type="number"
                        onChange={(e) => {
                            handleNumericChange(e, props.setMaxHP);
                        }}
                        fullWidth
                        inputProps={{ ...numericInputProps }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="Temp HP"
                        value={props.temporaryHP}
                        type="number"
                        onChange={(e) => {
                            handleNumericChange(e, props.setTemporaryHP);
                        }}
                        fullWidth
                        inputProps={{ ...numericInputProps }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="HP Mod"
                        value={props.receiveDamage}
                        type="number"
                        onChange={(e) => {
                            handleNumericChange(e, props.setReceiveDamage);
                        }}
                        fullWidth
                        inputProps={{ ...numericInputProps }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={0.5}>
                    <IconButton onClick={handleHPMod}>
                        <BloodtypeIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={0.5}>
                    <IconButton
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <FlagIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={0.5}>
                    <IconButton
                        onClick={() => {
                            if (props.delete && props.index !== undefined) {
                                props.delete(props.index);
                            }
                        }}
                    >
                        <ClearOutlinedIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={1}>
                    <Grid
                        container
                        direction="row"
                        spacing={2}
                        marginLeft={1}
                        marginBottom={-2}
                    >
                        <Flags
                            flags={props.flags}
                            index={props.index}
                            turn={props.turn}
                            deleteFlag={props.deleteFlag}
                            decreaseFlagDuration={props.decreaseFlagDuration}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
});

export default Creature;
