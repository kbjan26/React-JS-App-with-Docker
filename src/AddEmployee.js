import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  }
}));

export default function AddEmployee() {
  const classes = useStyles();
  const [firstLoad, setLoad] = React.useState(true);

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("1998-04-02T21:11:54")
  );
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");

  const handleFnameChange = event => setFname(event.target.value);
  const handleLnameChange = event => setLname(event.target.value);


  const [message, setMessage] = React.useState("Nothing saved in the session");

  async function sampleFunc(toInput) {
    const response = await fetch("/api/employee", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(toInput)
    });
    let body = await response.json();
    console.log(body.id);
    setMessage(body.id ? "Data sucessfully updated" : "Data updation failed");
  }

  const handleSubmit = variables => {
    const toInput = { fname, lname };
    sampleFunc(toInput);
    setFname("");
    setLname("");
  };

  if (firstLoad) {
    setLoad(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <GroupIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Employee Add
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="fname"
                value={fname}
                label="First Name"
                name="fname"
                autoComplete="fname"
                onChange={handleFnameChange}
              />
            </Grid>
             <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lname"
                            value={lname}
                            label="Last Name"
                            name="lname"
                            autoComplete="lname"
                            onChange={handleLnameChange}
                          />
                        </Grid>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            preventDefault
            className={classes.submit}
            onClick={handleSubmit}
          >
            Save
          </Button>

          <Grid container justify="center">
            <Grid item>
              <Link to="/view">View Employee Records</Link>
            </Grid>
          </Grid>
        </form>
        <Typography style={{ margin: 7 }} variant="body1">
          Status: {message}
        </Typography>
      </div>
    </Container>
  );
}