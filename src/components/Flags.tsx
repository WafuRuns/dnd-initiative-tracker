import React from "react";
import Flag from "./Flag";
import { FlagsProps } from "./types";

const Flags = (props: FlagsProps) => {
    return (
        <>
            {props.flags &&
                Array.from(props.flags).map((flag, i) => {
                    return (
                        <Flag
                            flag={flag}
                            index={props.index}
                            innerIndex={i}
                            turn={props.turn}
                            deleteFlag={props.deleteFlag}
                            decreaseFlagDuration={props.decreaseFlagDuration}
                            key={i}
                        />
                    );
                })}
        </>
    );
};

export default Flags;
