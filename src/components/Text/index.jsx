import React from 'react';
import style from "./style";

import {ListItem} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(style);

function Text({text, self}) {
    const classes = useStyles();

    return (
        <ListItem className={classes.listItem}>
            <div className={self ? classes.selfText : classes.theirText}>
                {text.toUpperCase()}
            </div>
        </ListItem>
    )
}

export default Text
