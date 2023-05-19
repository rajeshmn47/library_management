import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const drawerWidth = 300;

const DropdownList = styled(List)`
  text-align: left;
  background-color: #f2f0e7;
  border: none !important;
`;

const Title = styled(ListItem)`
  text-align: left;
  background-color: #f2f0e7;
  border: none;
  color: #333;
  font-weight: 600;
  border-bottom: 2px solid hsl(32.7, 14.7%, 70.6%);
`;

const SingleItem = styled(ListItem)`
  border-bottom: 1px solid hsla(33.6, 10%, 49.2%, 0.25);
  margin: 0 16px;
  width: calc(100% - 32px);
`;

function MenuD(props) {
  console.log(props, "props");
  const { window, menuOpen, setMenuOpen } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setMenuOpen(false);
  };

  const drawer = (
    <div>
      <Title>My Open Library</Title>
      <DropdownList>
        {["My Books", "My Profile", "Settings", "Logout"].map((text, index) => (
          <SingleItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </SingleItem>
        ))}
      </DropdownList>
      <Title>Browse</Title>
      <DropdownList>
        {[
          "Subjects",
          "Trending",
          "Library Explorer",
          "Lists",
          "Collections",
          "Book Talks",
          "Random Books",
        ].map((text, index) => (
          <SingleItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </SingleItem>
        ))}
      </DropdownList>
      <Title>Contribute</Title>
      <DropdownList>
        {["All a Book", "Recent Community Edits"].map((text, index) => (
          <SingleItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </SingleItem>
        ))}
      </DropdownList>
      <Title>Resources</Title>
      <DropdownList>
        {["Help & Support", "Developer Center", "Librarials Portal"].map(
          (text, index) => (
            <SingleItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </SingleItem>
          )
        )}
      </DropdownList>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Drawer
        variant="temporary"
        open={menuOpen}
        anchor="right"
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

MenuD.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default MenuD;
