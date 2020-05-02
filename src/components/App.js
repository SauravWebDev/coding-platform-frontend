import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import Footer from "./common/Footer";
import PageNotFound from "./PageNotFound";
import ProblemsPage from "./problems/ProblemsPage";
import ManageLoginPage from "./login/ManageLoginPage";
import ManageSignupPage from "./signup/ManageSignupPage";
import CreateUpdatePage from "./problems/CreateUpdatePage";
import TryCodePage from "./TryCode/TryCodePage";
import DiscussPage from "./discuss/Discuss"

import { ToastContainer } from "react-toastify";
import "../css/main.scss";

import "react-toastify/dist/ReactToastify.css";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

import HomeIcon from "@material-ui/icons/Home";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Gamma Coder
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                  <ChevronLeftIcon />
                )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <NavLink to="/">
              <ListItem button key={"All Problems"}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"All Problems"} />
              </ListItem>
            </NavLink>
          </List>
          <Divider />
          <NavLink to="/problem/createUpdate">
            <ListItem button key={"Add Problem"}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary={"Add Problem"} />
            </ListItem>
          </NavLink>
          <NavLink to="/login">
            <ListItem button key={"Login"}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItem>
          </NavLink>
          <NavLink to="/signup">
            <ListItem button key={"Signup"}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Signup"} />
            </ListItem>
          </NavLink>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route exact path="/" component={ProblemsPage} />
            <Route exact path="/problems" component={ProblemsPage} />
            <Route path="/login" component={ManageLoginPage} />
            <Route path="/signup" component={ManageSignupPage} />
            <Route path="/problems" component={ProblemsPage} />
            <Route
              path="/problem/createUpdate/:slug"
              component={CreateUpdatePage}
            />
            <Route path="/problem/createUpdate" component={CreateUpdatePage} />
            <Route path="/problem/:slug" component={TryCodePage} />
            <Route path="/discuss" component={DiscussPage} />
            <Route component={PageNotFound} />
          </Switch>
          <Footer />
          <ToastContainer autoClose={3000} hideProgressBar />
        </main>
      </div>
    </>
  );
}

export default App;
