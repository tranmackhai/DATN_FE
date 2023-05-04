import React from "react";
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";
import SideBar from "../common/SideBar";
import { Container, Grid } from "@mui/material";

const NewsLayout = ({ children, sidebar }) => {
  return (
    <div>
      <Topbar />
      {sidebar ? (
        <Container disableGutters={true} maxWidth="lg">
          <Grid container margin="32px 0">
            <Grid item xs={8}>
              {children}
            </Grid>
            <Grid item xs={4}>
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
