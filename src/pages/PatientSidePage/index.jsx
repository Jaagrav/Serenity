import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import style from "./style";

import { makeStyles } from "@material-ui/core/styles";
import { Container, AppBar, Avatar, List, IconButton, Grid, Divider } from "@material-ui/core";

import { firebase, userRef, chatsRef } from "../../firebase";

import { NORMAL_TO_MORSE_CHARS, MORSE_TO_NORMAL_CHARS } from "./morseLibrary";

const useStyles = makeStyles(style);
export default function PatientSidePage() {
  let touches = 0, clientX = 0, newClientX = 0;

  const classes = useStyles();
  const params = useParams();
  const chatserverID = params.id;

  const timeSinceLastTouch = useRef();

  const [thisUser, setThisUser] = useState(null);
  const [thatUser, setThatUser] = useState(null);

  const [convertArray, setConvertArray] = useState([]);
  const [text, setText] = useState("");
  const [morseText, setMorseText] = useState("");
  const [dispMorseText, setDispMorseText] = useState("");

  const dit = () => {
    console.log("Dit");
    setMorseText(morseText + '0');
  };

  const dash = () => {
    console.log("Dash");
    setMorseText(morseText + '1');
  };

  const nextAlphabet = () => {
    console.log("Next Alphabet");
    setMorseText(morseText + ' ');
  };

  const sendMsg = () => {
    console.log("Send Message");

    const sanitizedMessage = text.trim();
    if (sanitizedMessage.trim() !== "") {
      // chatsRef.child(chatserverID).push({
      //   message: sanitizedMessage,
      //   user: thisUser
      // }).then(snap => {
      //   chatsRef.child(chatserverID).child(snap.key).child("key").set(snap.key);
      // });
      window.responsiveVoice.speak(`Message sent to ${thatUser.displayName} ${sanitizedMessage}`);
      console.log("Send Message...", sanitizedMessage, thisUser);
    }
  };

  const mousedownlistener = snap => {
    if (window.innerWidth > 600) {
      touches++;

      clientX = snap.clientX;
      newClientX = snap.clientX;
    }
  };

  const mouseuplistener = snap => {
    const swipe = checkSwipe(clientX, newClientX);
    if (window.innerWidth > 600) {
      timeSinceLastTouch.current = 0;
      if (touches === 1) {
        dit();
      }
      if (touches === 2) {
        dash();
      }
      touches = 0;
    }
  };

  const touchstartlistener = snap => {
    if (snap.touches.length === 1) {
      clientX = snap.touches[0].clientX;
      newClientX = snap.touches[0].clientX;
    }
    touches = snap.touches.length;
  };

  const clientMove = snap => {
    if (snap?.touches?.length === 1)
      newClientX = snap.touches[0].clientX;
    else
      newClientX = snap.clientX;
  };

  const touchendlistener = snap => {
    const swipe = checkSwipe(clientX, newClientX);
    if (swipe === "noSwipe" && snap.touches.length === 0) {
      timeSinceLastTouch.current = 0;
      if (touches === 1) {
        dit();
        navigator.vibrate(50);
      }
      if (touches === 2) {
        dash();
        navigator.vibrate(150);
      }
    } else {
      if (swipe === "right") sendMsg();
      else nextAlphabet();
    }
  };

  const checkSwipe = (prevX, newX) => {
    if (prevX !== newX) {
      if (prevX > newX) { return "left"; }
      else { return "right"; }
    } else { return "noSwipe"; }
  };

  const contextmenulistener = event => event.preventDefault();
  document.body.addEventListener("keydown", e => {
    if (e.code === "KeyF") nextAlphabet();
    else if (e.code === "KeyJ") sendMsg();
  });
  useEffect(() => {


    const subscription = firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        userRef.child(currentUser.uid).once("value", snap => {
          setThisUser(snap.val());
        });
        userRef.child(chatserverID.replace(currentUser.uid, "")).once("value", snap => {
          setThatUser(snap.val());
        });
        chatsRef.child(chatserverID).on("child_added", snap => {
          let tempMorse = [];
          const text = snap.val().message;
          for (let i in text) {
            tempMorse += (NORMAL_TO_MORSE_CHARS[0][text[i]]) + " ";
          }
          window.responsiveVoice.speak(`New message from Jaagrav ${text}`);
          setMorseText(tempMorse);
        });
      }
    });

    return {
      subscription,
    };

  }, []);

  useEffect(() => {
    const cArray = morseText.split(' ');
    let tempText = "";
    console.log(cArray);

    for (let i in cArray) {
      if (cArray[i].trim() !== "")
        tempText += MORSE_TO_NORMAL_CHARS[0][cArray[i]];
      else
        tempText += cArray[i];
    }

    setText(tempText);
    window.responsiveVoice.speak(tempText);

    setDispMorseText(morseText.replace(/0/g, ".").replace(/1/g, "-"));
  }, [morseText]);

  return <Container className={classes.patientSidePage}>
    <div
      className={classes.patientSidePage}
      onContextMenu={contextmenulistener}
      onMouseUp={mouseuplistener}
      // onMouseMove={clientMove}
      onMouseDown={mousedownlistener}
      onTouchStart={touchstartlistener}
      onTouchMove={clientMove}
      onTouchEnd={touchendlistener}
    >

      <AppBar className={classes.header} position="sticky">
        <Avatar className={classes.profilePhoto} src={thatUser?.photoURL} alt={thatUser?.displayName} />
        <span className={classes.displayName}>{thatUser?.displayName}</span>
      </AppBar>
      <Grid container>
        <Grid xs={12} item>
          <div className={classes.text}>{text}</div>
        </Grid>
        <Grid xs={12} item>
          <div className={classes.morse}>{dispMorseText}</div>

        </Grid>
      </Grid>
    </div>
  </Container>;
}
