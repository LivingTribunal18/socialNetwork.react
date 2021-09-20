import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import Link from "@mui/material/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import LinkIcon from "@material-ui/icons/Link";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Contacts(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Contacts list
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <LinkIcon />
        </ListItemIcon>
        <ListItemText primary="Links" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Object.keys(props.editProfile.contacts).map((link, index) => {
            return (
              <ListItem button className={classes.nested} key={index}>
                <Link href={props.contacts[link]}>
                  <ListItemText primary={`${link} - ${props.contacts[link]}`} />
                </Link>

                {!props.hiddenEdit && (
                  <TextField
                    onChange={(e) =>
                      props.getEditedContactsList(link, e.target.value)
                    }
                    style={{ margin: "10px 20px" }}
                    size="small"
                    label="Link"
                    id="outlined-size-small"
                    value={props.editProfile.contacts[link]}
                  />
                )}
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
}
