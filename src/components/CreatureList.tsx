import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Creature from "./Creature";
import { CreatureProps, FlagData } from "./types";

const CreatureList = React.memo(() => {
    const [names, setNames] = useState<string[]>([]);
    const [HPs, setHPs] = useState<number[]>([]);
    const [maxHPs, setMaxHPs] = useState<number[]>([]);
    const [temporaryHPs, setTemporaryHPs] = useState<number[]>([]);
    const [initiatives, setInitiatives] = useState<number[]>([]);
    const [receiveDamages, setReceiveDamages] = useState<number[]>([]);
    const [flags, setFlags] = useState<FlagData[][]>([]);
    const [turn, setTurn] = useState<number>(-1);
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    const loadDataRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            const newNames: string[] = parseJSONWithCheck(
                localStorage.getItem("names")
            ) as string[];
            const newHPs: number[] = parseJSONWithCheck(
                localStorage.getItem("HPs")
            ) as number[];
            const newMaxHPs: number[] = parseJSONWithCheck(
                localStorage.getItem("maxHPs")
            ) as number[];
            const newTemporaryHPs: number[] = parseJSONWithCheck(
                localStorage.getItem("temporaryHPs")
            ) as number[];
            const newInitiatives: number[] = parseJSONWithCheck(
                localStorage.getItem("initiatives")
            ) as number[];
            const newReceiveDamages: number[] = parseJSONWithCheck(
                localStorage.getItem("receiveDamages")
            ) as number[];
            const newTurn: number = parseJSONWithCheck(
                localStorage.getItem("turn")
            ) as number;
            const newFlags: FlagData[][] = parseJSONWithCheck(
                localStorage.getItem("flags")
            ) as FlagData[][];
            setNames(newNames);
            setHPs(newHPs);
            setMaxHPs(newMaxHPs);
            setTemporaryHPs(newTemporaryHPs);
            setInitiatives(newInitiatives);
            setReceiveDamages(newReceiveDamages);
            if (typeof newTurn !== "number") {
                setTurn(0);
            } else {
                setTurn(newTurn);
            }
            setFlags(newFlags);
            setDataLoaded(true);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (dataLoaded) {
            const currentTurn = getPositions()[turn];
            if (currentTurn !== undefined) {
                let newFlags = [...flags];
                newFlags[currentTurn].forEach((flag) => {
                    flag.duration += 1;
                });
                setFlags(newFlags);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataLoaded]);

    useEffect(() => {
        if (names.length) {
            localStorage.setItem("names", JSON.stringify(names));
        }
    }, [names]);

    useEffect(() => {
        if (HPs.length) {
            localStorage.setItem("HPs", JSON.stringify(HPs));
        }
    }, [HPs]);

    useEffect(() => {
        if (maxHPs.length) {
            localStorage.setItem("maxHPs", JSON.stringify(maxHPs));
        }
    }, [maxHPs]);

    useEffect(() => {
        if (temporaryHPs.length) {
            localStorage.setItem("temporaryHPs", JSON.stringify(temporaryHPs));
        }
    }, [temporaryHPs]);

    useEffect(() => {
        if (initiatives.length) {
            localStorage.setItem("initiatives", JSON.stringify(initiatives));
        }
    }, [initiatives]);

    useEffect(() => {
        if (receiveDamages.length) {
            localStorage.setItem(
                "receiveDamages",
                JSON.stringify(receiveDamages)
            );
        }
    }, [receiveDamages]);

    useEffect(() => {
        if (flags.length) {
            localStorage.setItem("flags", JSON.stringify(flags));
        }
    }, [flags]);

    useEffect(() => {
        if (turn !== -1) {
            localStorage.setItem("turn", JSON.stringify(turn));
            const previousTurn =
                turn !== 0
                    ? getPositions()[turn - 1]
                    : getPositions()[initiatives.length - 1];
            if (previousTurn !== undefined) {
                let newFlags = [...flags];
                newFlags[previousTurn] = newFlags[previousTurn].filter(
                    (flag) => {
                        return flag.duration > 0;
                    }
                );
                setFlags(newFlags);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [turn]);

    const parseJSONWithCheck = (
        input: string | null
    ): string[] | number[] | number | FlagData[][] => {
        if (input === null) {
            return [];
        }
        return JSON.parse(input);
    };

    const getPositions = useCallback(() => {
        return Array.from(Array(initiatives.length).keys()).sort((a, b) =>
            initiatives[a] < initiatives[b]
                ? 1
                : initiatives[b] <= initiatives[a]
                ? -1
                : 0
        );
    }, [initiatives]);

    const addCreature = useCallback(
        (props: CreatureProps) => {
            setNames([...names, props.name]);
            setHPs([...HPs, props.HP]);
            setMaxHPs([...maxHPs, props.maxHP]);
            setTemporaryHPs([...temporaryHPs, props.temporaryHP]);
            setInitiatives([...initiatives, props.initiative]);
            setReceiveDamages([...receiveDamages, props.receiveDamage]);
            if (props.flags) {
                setFlags([...flags, props.flags]);
            }
        },
        [HPs, initiatives, maxHPs, temporaryHPs, names, receiveDamages, flags]
    );

    const deleteCreature = useCallback(
        (index: number) => {
            let newValues = [
                [...names],
                [...HPs],
                [...maxHPs],
                [...temporaryHPs],
                [...initiatives],
                [...receiveDamages],
                [...flags],
            ];
            newValues.forEach((value) => {
                value.splice(index, 1);
            });
            setNames(newValues[0] as string[]);
            setHPs(newValues[1] as number[]);
            setMaxHPs(newValues[2] as number[]);
            setTemporaryHPs(newValues[3] as number[]);
            setInitiatives(newValues[4] as number[]);
            setReceiveDamages(newValues[5] as number[]);
            setFlags(newValues[6] as FlagData[][]);
        },
        [HPs, initiatives, maxHPs, temporaryHPs, names, receiveDamages, flags]
    );

    const updateNames = useCallback(
        (value: string, index: number) => {
            let newNames = [...names];
            newNames[index] = value;
            setNames(newNames);
        },
        [names]
    );

    const updateHPs = useCallback(
        (value: number, index: number) => {
            let newHPs = [...HPs];
            newHPs[index] = value;
            setHPs(newHPs);
        },
        [HPs]
    );

    const updateMaxHPs = useCallback(
        (value: number, index: number) => {
            let newMaxHPs = [...maxHPs];
            newMaxHPs[index] = value;
            setMaxHPs(newMaxHPs);
        },
        [maxHPs]
    );

    const updateTemporaryHPs = useCallback(
        (value: number, index: number) => {
            let newTemporaryHPs = [...temporaryHPs];
            newTemporaryHPs[index] = value;
            setTemporaryHPs(newTemporaryHPs);
        },
        [temporaryHPs]
    );

    const updateInitiatives = useCallback(
        (value: number, index: number) => {
            let newInitiatives = [...initiatives];
            newInitiatives[index] = value;
            setInitiatives(newInitiatives);
        },
        [initiatives]
    );

    const updateReceiveDamages = useCallback(
        (value: number, index: number) => {
            let newReceiveDamages = [...receiveDamages];
            newReceiveDamages[index] = value;
            setReceiveDamages(newReceiveDamages);
        },
        [receiveDamages]
    );

    const deleteFlag = useCallback(
        (index: number, innerIndex: number) => {
            const newFlags = [...flags];
            newFlags[index].splice(innerIndex, 1);
            setFlags(newFlags);
        },
        [flags]
    );

    const decreaseFlagDuration = useCallback(
        (index: number, innerIndex: number) => {
            const newFlags = [...flags];
            newFlags[index][innerIndex].duration =
                newFlags[index][innerIndex].duration - 1;
            setFlags(newFlags);
        },
        [flags]
    );

    const addFlag = useCallback(
        (name: string, duration: number, color: string, index: number) => {
            const newFlags = [...flags];
            newFlags[index].push({
                name: name,
                duration: duration,
                color: color,
            });
        },
        [flags]
    );

    const saveData = () => {
        const jsonFile = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify({
                names: names,
                HPs: HPs,
                maxHPs: maxHPs,
                temporaryHPs: temporaryHPs,
                initiatives: initiatives,
                receiveDamages: receiveDamages,
                turn: turn,
                flags: flags,
            })
        )}`;
        const link = document.createElement("a");
        link.href = jsonFile;
        link.download = "initiative-tracker-data.json";
        link.click();
    };

    const loadData = (file: File) => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            const content = fileReader.result;
            if (typeof content === "string") {
                const result = JSON.parse(content);
                if (
                    result.names !== undefined &&
                    result.HPs !== undefined &&
                    result.maxHPs !== undefined &&
                    result.temporaryHPs !== undefined &&
                    result.initiatives !== undefined &&
                    result.receiveDamages !== undefined &&
                    result.turn !== undefined &&
                    result.flags !== undefined
                ) {
                    setNames(result.names);
                    setHPs(result.HPs);
                    setMaxHPs(result.maxHPs);
                    setTemporaryHPs(result.temporaryHPs);
                    setInitiatives(result.initiatives);
                    setReceiveDamages(result.receiveDamages);
                    setTurn(result.turn);
                    setFlags(result.flags);
                }
            }
        };
        fileReader.readAsText(file);
    };

    const handlePreviousTurnClick = () => {
        const newTurn = turn - 1;
        if (newTurn >= 0) {
            setTurn(newTurn);
        } else {
            setTurn(initiatives.length - 1);
        }
    };

    const handleNextTurnClick = () => {
        const newTurn = turn + 1;
        if (newTurn < initiatives.length) {
            setTurn(newTurn);
        } else {
            setTurn(0);
        }
    };

    const handleAddNewCreature = () => {
        addCreature({
            name: "",
            HP: 0,
            maxHP: 0,
            temporaryHP: 0,
            initiative: 0,
            receiveDamage: 0,
            flags: [],
        });
    };

    const handleLoadData = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            loadData(e.target.files[0]);
        }
    };

    const handleLoadDataClick = () => {
        loadDataRef.current?.click();
    };

    return (
        <Grid container direction="column" spacing={3} alignItems="center">
            {getPositions().map((pos, i) => (
                <Grid item key={pos}>
                    <Creature
                        name={names[pos]}
                        HP={HPs[pos]}
                        maxHP={maxHPs[pos]}
                        temporaryHP={temporaryHPs[pos]}
                        initiative={initiatives[pos]}
                        receiveDamage={receiveDamages[pos]}
                        index={pos}
                        flags={flags[pos]}
                        turn={turn === i}
                        setName={updateNames}
                        setHP={updateHPs}
                        setMaxHP={updateMaxHPs}
                        setTemporaryHP={updateTemporaryHPs}
                        setInitiative={updateInitiatives}
                        setReceiveDamage={updateReceiveDamages}
                        delete={deleteCreature}
                        deleteFlag={deleteFlag}
                        decreaseFlagDuration={decreaseFlagDuration}
                        addFlag={addFlag}
                    />
                </Grid>
            ))}
            <Grid item>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={handlePreviousTurnClick}
                        >
                            Previous turn
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={handleNextTurnClick}
                        >
                            Next turn
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={handleAddNewCreature}
                        >
                            Add a new creature
                        </Button>
                    </Grid>
                    <Grid item>
                        <input
                            onChange={handleLoadData}
                            type="file"
                            ref={loadDataRef}
                            style={{ display: "none" }}
                        ></input>
                        <Button
                            variant="outlined"
                            onClick={handleLoadDataClick}
                        >
                            Load data
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onClick={saveData}>
                            Save data
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
});

export default CreatureList;
