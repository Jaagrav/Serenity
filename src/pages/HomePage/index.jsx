import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import style from "./style";

import { makeStyles } from "@material-ui/core/styles";
import { Container, AppBar, Grid, Avatar, List, Menu, MenuItem, Switch, Divider} from "@material-ui/core";

import {firebase, userRef} from "../../firebase";

import ChatHead from "../../components/ChatHead";

const useStyles = makeStyles(style);
export default function HomePage({patientMode, setPatientMode}) {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const logOut = (e) => {
    firebase.auth().signOut();
  }

  const togglePatientMode = (e) => {
    setPatientMode(e.target.checked);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(currentUser => {
      if(currentUser) {
        setUser(currentUser);
        const {uid, displayName, photoURL, email} = currentUser;
        userRef.child(currentUser.uid).set({
          uid,
          displayName,
          photoURL,
          email
        });

        userRef.on("value", snap => {
          const vals = snap.val();
          const pushVals = [];

          for(let i in vals){
            if(vals[i].uid !== currentUser.uid)
              pushVals.push(vals[i]);
          }

          setUsers(pushVals)
        })

      } else history.replace("/auth");
    })
  }, [])

  return <Container className={classes.homePage}>
    <AppBar className={classes.header} position="sticky">
      <Grid container>
        <Grid xs={10}><div className={classes.brandingName}>Serenity</div></Grid>
        <Grid xs={2}>
          <Avatar className={classes.userProfilePic} alt={user?.displayName} src={user?.photoURL} onClick={openMenu} />
        </Grid>
      </Grid>
    </AppBar>
    <List className={classes.chats}>
      {users.map((userData, index) => (
        <ChatHead key={`chathead-index-${index}`} userData={userData} thisUser={user}  patientMode={patientMode} />       
      ))}
    </List>
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={closeMenu}
    >
      <MenuItem onClick={logOut}>Logout</MenuItem>
    </Menu>
    <AppBar position="sticky" className={classes.bottomAppBar}>
        <Divider className={classes.divider} light />
        <Grid container>
          <Grid xs={10}>
            <div className={classes.patientMode}>Patient Mode</div>
          </Grid>
          <Grid xs={2} container>
          <Switch
            checked={patientMode}
            onChange={togglePatientMode}
            className={classes.patientModeSwitch}
            color="primary"
            name="Patient Mode"
          />
          </Grid>
        </Grid>
    </AppBar>
  </Container>;
}
