import React from "react";
import "../App.css";

import { Grid, Paper, Button } from "@material-ui/core";

const SignUp = () => {
  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Paper elevation="3">
        <h3>Create an account</h3>
          <form>
            <p>Username: </p>
            <input />
            <p>Password: </p>
            <input />
            <Grid item direction="row" justify="center" alignItems="center">
              <Button>Enter</Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}

export default SignUp;