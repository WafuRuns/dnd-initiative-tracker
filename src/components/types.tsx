export interface CreatureProps {
    name: string;
    HP: number;
    maxHP: number;
    temporaryHP: number;
    initiative: number;
    receiveDamage: number;
    index?: number;
    turn?: boolean;
    flags?: FlagData[];
    setName?: (value: string, index: number) => void;
    setHP?: (value: number, index: number) => void;
    setMaxHP?: (value: number, index: number) => void;
    setTemporaryHP?: (value: number, index: number) => void;
    setInitiative?: (value: number, index: number) => void;
    setReceiveDamage?: (value: number, index: number) => void;
    delete?: (index: number) => void;
    deleteFlag?: (index: number, innerIndex: number) => void;
    decreaseFlagDuration?: (index: number, innerIndex: number) => void;
    addFlag?: (
        name: string,
        duration: number,
        color: string,
        index: number
    ) => void;
}

export type FlagDialogProps = {
    open: boolean;
    index?: number;
    turn?: boolean;
    setOpen: (value: boolean) => void;
    addFlag?: (
        name: string,
        duration: number,
        color: string,
        index: number
    ) => void;
};

export type FlagsProps = {
    flags?: FlagData[];
    index?: number;
    turn?: boolean;
    deleteFlag?: (index: number, innerIndex: number) => void;
    decreaseFlagDuration?: (index: number, innerIndex: number) => void;
};

export type FlagProps = {
    flag?: FlagData;
    index?: number;
    innerIndex?: number;
    turn?: boolean;
    deleteFlag?: (index: number, innerIndex: number) => void;
    decreaseFlagDuration?: (index: number, innerIndex: number) => void;
};

export type FlagData = {
    name: string;
    duration: number;
    color?: string;
};

export const FlagColors = {
    Blinded: "#9e9e9e",
    Deafened: "#ef9a9a",
    Frightened: "#f57c00",
    Invisible: "#78909c",
    Petrified: "#00695c",
    Restrained: "#5d4037",
    Charmed: "#e91e63",
    Drunk: "#880e4f",
    Grappled: "#1a237e",
    OnFire: "#d50000",
    Poisoned: "#64dd17",
    Stunned: "#01579b",
    Concentration: "#29b6f6",
    Incapacitated: "#9c27b0",
    Paralyzed: "#4a148c",
    Prone: "#fbc02d",
    Unconscious: "#827717",
};

export type FlagColorsKey = keyof typeof FlagColors;
