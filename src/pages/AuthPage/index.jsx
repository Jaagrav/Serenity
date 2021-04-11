import React, {useEffect} from "react";
import {useHistory} from "react-router-dom"
import style from "./style";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";

import { firebase } from "../../firebase"

const useStyles = makeStyles(style);

export default function AuthPage() {
  const classes = useStyles();
  const history = useHistory()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(currentUser => {
      if(currentUser) history.replace("/home");
    });
    console.log(process.env)
  }, [])

  const signInWithGoogle = () => {
    const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(GoogleAuthProvider);
  }

  return <Container className={classes.authPage} disableGutters>
    <div className={classes.brandingName}>Serenity</div>
    <Button className={classes.signInBtn} onClick={signInWithGoogle} variant="contained" color="secondary">Sign In with Google</Button>
  </Container>;
}
