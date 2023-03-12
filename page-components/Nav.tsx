import { useState } from "react";
import { useRouter } from "next/router";

import { useSession, signIn, signOut } from 'next-auth/react';

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";

import Drawer from "@mui/material/Drawer";

import ProfileMenu from './ProfileMenu'

export default function Nav() {

  const { data: session } = useSession()


  console.log('session ', session)

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // TODO: fix any!
  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };

  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      text: "Current patients",
      icon: <PeopleIcon />,
      link: "/patients/",
    },
    {
      text: "Add patient",
      icon: <AddBoxIcon />,
      link: "/patients/new",
    },
    {
      text: "Messages",
      icon: <MessageIcon />,
      link: "/messages",
    },
    {
      text: "Add message",
      icon: <AddCircleIcon />,
      link: "/messages/new",
    },
  ];

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ninaivu
          </Typography>
          {
            session ? <ProfileMenu session={session} onLogout={() => signOut()} /> : <Button color="inherit" onClick={() => signIn()}>Login</Button>
          }
        </Toolbar>
      </AppBar>

      <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => router.push(item.link)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
