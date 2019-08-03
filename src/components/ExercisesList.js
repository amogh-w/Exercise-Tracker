import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import axios from "axios";
export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: []
    };
    this.deleteExercise = this.deleteExercise.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises")
      .then(res => {
        this.setState({ exercises: res.data });
      })
      .catch(err => console.log(`Err: ${err}`));
  }

  deleteExercise(id) {
    console.log(id);
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then(res => console.log(res.data));
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    });
  }

  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.exercises.map(exercise => {
            return (
              <TableRow>
                <TableCell>{exercise.username}</TableCell>
                <TableCell>{exercise.description}</TableCell>
                <TableCell>{exercise.duration}</TableCell>
                <TableCell>{exercise.date.substring(0, 10)}</TableCell>
                <TableCell>
                  <Link
                    to={"/edit/" + exercise._id}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="outlined" style={{ margin: "10px" }}>
                      Edit
                    </Button>
                  </Link>
                  <Button onClick={() => this.deleteExercise(exercise._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}
