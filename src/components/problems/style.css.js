import { makeStyles } from "@material-ui/core";

let style = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  plist: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  add: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    textAlign: "center"
  }
}));

export default style;
