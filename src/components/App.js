import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout as logoutAction } from "../redux/actions/loginAction";

import {
  homeLink,
  listProblemLink,
  addProblemLink,
  loginLink,
  signupLink,
  updateProblemLink,
  solveProblemLink,
} from "../Config/RouterLinkConfig";
import Footer from "./common/Footer";
import PageNotFound from "./PageNotFound";
import ProblemsPage from "./problems/ProblemsPage";
import ManageLoginPage from "./login/ManageLoginPage";
import ManageSignupPage from "./signup/ManageSignupPage";
import CreateUpdatePage from "./problems/CreateUpdatePage";
import TryCodePage from "./TryCode/TryCodePage";

import { ToastContainer, toast } from "react-toastify";
import "../css/main.scss";

import "react-toastify/dist/ReactToastify.css";

import clsx from "clsx";
import { makeStyles, useTheme, createMuiTheme } from "@material-ui/core/styles";
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

import HomeIcon from "@material-ui/icons/Home";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
//for app bar
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

//login icon
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { ThemeProvider } from "@material-ui/styles";
import "./App.scss";
import Button from "./common/Button";
const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
    padding: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

function App({ isLoggedIn, isAdmin, ...props }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutUser = () => {
    try {
      props.logoutAction();
      toast.success("Logout successfully");
      setAnchorEl(null);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <ThemeProvider theme={mainTheme}>
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
              <Typography variant="h6" className={classes.title}>
                gammaCoder
              </Typography>
              {isLoggedIn && (
                <>
                  <div>
                    <Button onClick={handleMenu}>
                      <AccountCircle fontSize="large" />
                      <span className="userName"> {props.name}</span>
                      <ArrowDropDownIcon fontSize="large" />
                    </Button>
                  </div>
                  <div>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={openMenu}
                      onClose={handleClose}
                    >
                      <MenuItem>Change Password</MenuItem>
                      <NavLink to={loginLink}>
                        <MenuItem onClick={logoutUser}>Log Out</MenuItem>
                      </NavLink>
                    </Menu>
                  </div>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <NavLink
                    to={loginLink}
                    style={{
                      backgroundColor: "white",
                      border: "1px solid hsl(246, 55%, 47%)",
                      borderRadius: "3px",
                    }}
                  >
                    <ListItem button key={"Login"}>
                      <LockOpenOutlinedIcon />
                      <ListItemText primary={"Login"} />
                    </ListItem>
                  </NavLink>
                </>
              )}
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
            <List />
            <NavLink
              color="primary"
              exact
              to={homeLink}
              activeClassName={"activeLink"}
            >
              <ListItem button key={"All Problems"}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"All Problems"} />
              </ListItem>
            </NavLink>

            <Divider />
            {isAdmin && (
              <NavLink to={addProblemLink} activeClassName={"activeLink"}>
                <ListItem button key={"Add Problem"}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Add Problem"} />
                </ListItem>
              </NavLink>
            )}
            {!isLoggedIn && (
              <>
                <NavLink to={loginLink} activeClassName={"activeLink"}>
                  <ListItem button key={"Login"}>
                    <ListItemIcon>
                      <LockOpenOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Login"} />
                  </ListItem>
                </NavLink>
                <NavLink to={signupLink} activeClassName={"activeLink"}>
                  <ListItem button key={"Signup"}>
                    <ListItemIcon>
                      <PersonAddOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Signup"} />
                  </ListItem>
                </NavLink>
              </>
            )}
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <Switch>
              <Route exact path={homeLink} component={ProblemsPage} />
              <Route exact path={listProblemLink} component={ProblemsPage} />
              <Route path={loginLink} component={ManageLoginPage} />
              <Route path={signupLink} component={ManageSignupPage} />
              <Route path={updateProblemLink} component={CreateUpdatePage} />
              <Route path={addProblemLink} component={CreateUpdatePage} />
              <Route path={solveProblemLink} component={TryCodePage} />

              <Route component={PageNotFound} />
            </Switch>
            <Footer />
            <ToastContainer autoClose={3000} hideProgressBar />
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  logoutAction: PropTypes.func.isRequired,
  name: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    isAdmin:
      state.userData.isAuthenticated &&
      state.userData.data &&
      state.userData.data.role == 2
        ? true
        : false,
    isLoggedIn: state.userData.isAuthenticated,
    name: state.userData.data.firstName || "",
  };
}
const mapDispatchToProps = {
  logoutAction: logoutAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
