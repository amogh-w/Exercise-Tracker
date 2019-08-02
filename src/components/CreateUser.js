import React, { Component } from "react";
import { Typography, Divider, TextField, Button } from "@material-ui/core";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username
    };
    axios
      .post("http://localhost:5000/users/add", user)
      .then(res => console.log(res.data));
    this.setState({
      username: ""
    });
  };

  render() {
    return (
      <React.Fragment>
        <Typography>Enter Username</Typography>
        <Divider style={{ margin: "20px 0px" }} />
        <TextField
          name="username"
          value={this.state.username}
          onChange={this.onChange}
          label="Username"
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "26px 0px" }}
          onClick={this.onSubmit}
        >
          Create
        </Button>
      </React.Fragment>
    );
  }
}
