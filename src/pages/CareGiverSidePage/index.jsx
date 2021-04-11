import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import style from "./style";

import { makeStyles } from "@material-ui/core/styles";
import { Container, AppBar, Avatar, List, IconButton, Grid, Divider} from "@material-ui/core";
import {Send as SendIcon} from "@material-ui/icons";

import {firebase, userRef, chatsRef} from "../../firebase";

import Text from "../../components/Text";

import voice from "responsivevoice";

const useStyles = makeStyles(style);
export default function CareGiverSidePage() {
  const classes = useStyles();
  const params = useParams();
  const chatserverID = params.id;
  const [thisUser, setThisUser] = useState(null);
  const [thatUser, setThatUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMsg = () => {
    const sanitizedMessage = message.trim();
    if(sanitizedMessage.trim() !== "") {
      chatsRef.child(chatserverID).push({ 
        message: sanitizedMessage,
        user: thisUser
      }).then(snap => {
        chatsRef.child(chatserverID).child(snap.key).child("key").set(snap.key)
      })
      window.responsiveVoice.speak(`Message sent to ${thatUser.displayName} ${sanitizedMessage}`);
      // console.log("Send Message...", sanitizedMessage, thisUser);
    }
  };

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(currentUser => {
      if(currentUser) {
        userRef.child(currentUser.uid).once("value", snap => {
          setThisUser(snap.val());
        })
        userRef.child(chatserverID.replace(currentUser.uid, "")).once("value", snap => {
          setThatUser(snap.val());
        })
        chatsRef.child(chatserverID).on("child_added", snap => {
          setMessages(prevMessages => [...prevMessages, {...snap.val()}]);
        })
      }
    });
  }, [])

  return <Container className={classes.careGiverSidePage} disableGutters maxWidth="sm">
    <AppBar className={classes.header} position="sticky">
      <Avatar className={classes.profilePhoto} src={thatUser?.photoURL} alt={thatUser?.displayName} />
      <span className={classes.displayName}>{thatUser?.displayName}</span>
    </AppBar>
    <List className={classes.messageList}>
      {messages.map((text,index) => (
        <Text key={`text-index-${index}`} text={text.message} self={text.user.uid === thisUser.uid} />
      ))}
    </List>
    <AppBar className={classes.footer} position="fixed">
      <Container maxWidth="sm" disableGutters>
      <Divider light className={classes.divider} />
        <Grid container>
          <Grid xs={10}>
            <input type="text" className={classes.textMsg} placeholder="Type Something..." value={message} onChange={(e) => setMessage(e.target.value.toUpperCase())} onKeyPress={(e) => {if(e.code === "Enter") sendMsg();}}/>
          </Grid>
          <Grid xs={2} className={classes.sendMsg} >
            <IconButton className={classes.sendMsgBtn} color={message.trim() !== '' ? "primary" : "secondary"} onClick={sendMsg} >
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  </Container>;
}
