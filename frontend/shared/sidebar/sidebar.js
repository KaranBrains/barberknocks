import React from 'react';
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from '@material-ui/icons/Group';
import Link from "next/link";
import BookIcon from '@material-ui/icons/Book';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RoomServiceIcon from '@material-ui/icons/RoomService';

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
  
  export default function MiniDrawer() {
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
            {/* <ListItem button>
              <ListItemIcon>
                <Link href="/admin/dashboard">
                  <a><DashboardIcon /></a>
                </Link>
              </ListItemIcon>
              <Link href="/admin/dashboard">
                <a><ListItemText primary="Dashboard" /></a>
              </Link>
            </ListItem> */}
            <ListItem button>
              <ListItemIcon>
                <Link href="/admin/users">
                  <a><AccountCircleIcon /></a>
                </Link>
              </ListItemIcon>
              <Link href="/admin/users">
                <a><ListItemText primary="User" /></a>
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Link href="/admin/service">
                  <a><RoomServiceIcon /></a>
                </Link>
              </ListItemIcon>
              <Link href="/admin/service">
                <a><ListItemText primary="Services" /></a>
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Link href="/admin/stylist">
                  <a><GroupIcon /></a>
                </Link>
              </ListItemIcon>
              <Link href="/admin/stylist">
                <a><ListItemText primary="Stylist" /></a>
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Link href="/admin/slots">
                  <a><BookIcon /></a>
                </Link>
              </ListItemIcon>
              <Link href="/admin/slots">
                <a><ListItemText primary="Slots" /></a>
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Link href="/admin/all-rides">
                  <a><DirectionsCarIcon /></a>
                </Link>
              </ListItemIcon>
              <Link href="/admin/all-rides">
                <a><ListItemText primary="All Rides" /></a>
              </Link>
            </ListItem>
            <ListItem button onClick={()=>{
              localStorage.clear();
              window.location.href="/auth/login";
            }}>
              <ListItemIcon>
                <Link href="">
                  <a><ExitToAppIcon /></a>
                </Link>
              </ListItemIcon>
              <Link href="">
                <a><ListItemText primary="Logout" /></a>
              </Link>
            </ListItem>
            {/* <ListItem button>
              <ListItemIcon>
                <Link onClick={()=>{
                  localStorage.clear();
                  window.location.href = "/login"
                }}>
                  <strong>
                    <i class="fas fa-sign-out-alt text-20"></i>
                  </strong>
                </Link>
              </ListItemIcon>
              <Link onClick={()=>{
                  localStorage.clear();
                  window.location.href("/login")
                }}>
                <ListItemText primary="Logout" />
              </Link>
            </ListItem> */}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
        </main>
      </div>
    );
  }
  