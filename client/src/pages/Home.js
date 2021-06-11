import React, { useState } from "react";
import SignUp from "./SignUp";
import Summary from "./Summary";
import "../App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Grid, Paper, Button } from "@material-ui/core";

const Home = () => {

    const [auth, setAuth] = useState(false)

    const layout = {
        margin: {
            marginTop: "20%"
        },
        card: {
            width: "50%"
        }
    }
    
    if (!auth)
    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Router>
                <Grid item direction="row">
                    <Link to="/">Login</Link>
                    <Link to="/signup">SignUp</Link>
                </Grid>
            <Grid container item direction="row" justify="center" alignItems="center" style={layout.card}>
            <Switch>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/">
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Paper elevation="3" style={layout.card}>
                            <h3>Login</h3>
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
                </Route>  
            </Switch>
            </Grid>
            </Router>
        </Grid>
        
    )
    return (
        <div>
            <Summary />
        </div>
    )
}

export default Home;