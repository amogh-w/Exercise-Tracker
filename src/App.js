import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Navbar from "./components/Navbar";
import ExercisesList from "./components/ExercisesList";
import EditExercise from "./components/EditExercise";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";

export default function App() {
  const useStyles = makeStyles({
    main: {
      margin: "20px",
      padding: "20px"
    }
  });

  const classes = useStyles();

  return (
    <Router>
      <Navbar />
      <Paper className={classes.main} square>
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </Paper>
    </Router>
  );
}
