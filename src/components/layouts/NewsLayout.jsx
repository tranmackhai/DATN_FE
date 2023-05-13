import React from "react";
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";
import SideBar from "../common/SideBar";
import { Container, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";

const NewsLayout = ({ children, sidebar }) => {
  const theme = useTheme();
  return (
    <div>
      <Topbar />
      {sidebar ? (
        <Container disableGutters={true} maxWidth="lg">
          <Grid container margin="32px 0">
            <Grid
              item
              xs={9}
              sx={{
                padding: "24px 12px",
                borderRadius: "4px",
                border: `1px solid ${theme.palette.primary.border}`,
              }}
            >
              {children}
            </Grid>
            <Grid item xs={3}>
              <SideBar />
            </Grid>
          </Grid>
        </Container>
      ) : (
        children
      )}
      <Footer />
    </div>
  );
};

export default NewsLayout;
