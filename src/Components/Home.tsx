import { Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import SalesChart from "./Home/Chart/SalesChart";
import Users from "./Home/Users";

function Home() {
  return (
    <>
      <Sidebar />
      <div className="container">
        <div className="introduction">
          <h1>Welcome to Dashboard</h1>
          <p>Here you can see the user list and sales chart</p>
        </div>
        <Grid container spacing={2} mt={2}>
          <Grid className="grid-border-box">
            <h1>User List</h1>
            <Users />
          </Grid>
          <Grid className="grid-border-box-second">
            <SalesChart />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Home