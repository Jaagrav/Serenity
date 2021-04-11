import React, { useState, useEffect } from "react";
import style from "./style";
import theme from "./theme";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { CssBaseline, Container } from "@material-ui/core";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";

import AuthPage from "./pages/AuthPage";
import CareGiverSidePage from "./pages/CareGiverSidePage";
import HomePage from "./pages/HomePage";
import PatientSidePage from "./pages/PatientSidePage";

const useStyles = makeStyles(style);

function Content() {
  const classes = useStyles();
  const [patientMode, setPatientMode] = useState(
    localStorage.getItem("patientMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("patientMode", patientMode);
  }, [patientMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className={classes.container} disableGutters maxWidth="sm">
        <Router>
          <Switch>
            <Route exact path="/auth" component={() => <AuthPage />} />
            <Route
              exact
              path="/care-giver-chat/:id"
              component={() => <CareGiverSidePage />}
            />
            <Route
              exact
              path="/home"
              component={() => (
                <HomePage
                  patientMode={patientMode}
                  setPatientMode={setPatientMode}
                />
              )}
            />
            <Route
              exact
              path="/patient-chat/:id"
              component={() => <PatientSidePage />}
            />

            <Redirect to="/home" />
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default function App() {
  return <Content />;
}
