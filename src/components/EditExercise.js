import React, { Component } from "react";
import {
  Typography,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";
import axios from "axios";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      description: "",
      duration: "",
      date: "2019-01-01T10:30",
      users: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/exercises/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: res.data.date
        });
      })
      .catch(err => console.log(`Error: ${err}`));

    axios.get("http://localhost:5000/users").then(res => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map(user => user.username)
        });
      }
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    axios
      .post(
        `http://localhost:5000/exercises/update/${this.props.match.params.id}`,
        exercise
      )
      .then(res => console.log(res.data));

    window.location = "/";
  };

  render() {
    return (
      <React.Fragment>
        <Typography>Edit Activity Details</Typography>
        <Divider style={{ margin: "20px 0px" }} />
        <FormControl>
          <InputLabel>User</InputLabel>
          <Select
            name="username"
            value={this.state.username}
            onChange={this.onChange}
          >
            {this.state.users.map(user => {
              return <MenuItem value={user}>{user}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <br />
        <TextField
          name="description"
          value={this.state.description}
          onChange={this.onChange}
          label="Description"
          margin="normal"
        />
        <br />
        <TextField
          name="duration"
          value={this.state.duration}
          onChange={this.onChange}
          label="Duration"
          margin="normal"
        />
        <br />
        <TextField
          name="date"
          type="datetime-local"
          defaultValue={this.state.date}
          onChange={this.onChange}
          margin="normal"
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "20px 0px" }}
          onClick={this.onSubmit}
        >
          Update
        </Button>
      </React.Fragment>
    );
  }
}
