import React from 'react';
import { useHistory } from "react-router-dom";
import style from "./style";

import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";

const useStyles = makeStyles(style);
function ChatHead({userData, thisUser, patientMode}) {
    const classes = useStyles();
    const history = useHistory();

    const openChats = () => {
        const thisUserID = thisUser.uid;
        const thatUserID = userData.uid;

        const chatServer = (thisUserID.localeCompare(thatUserID) < 0) ? thisUserID + thatUserID : thatUserID + thisUserID;
        
        if(patientMode)
            history.push(`/patient-chat/${chatServer}`)
        else
            history.push(`/care-giver-chat/${chatServer}`)
    }

    return (
        <>
            <ListItem button onClick={openChats}>
                <ListItemAvatar>
                    <Avatar className={classes.avatar} src={userData.photoURL}/>
                </ListItemAvatar>
                <ListItemText className={classes.displayName} primary={userData.displayName} />
            </ListItem>
            <Divider className={classes.divider} light />
        </>
    )
}

export default ChatHead
