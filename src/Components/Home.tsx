import Sidebar from "./Sidebar"
import Users from "./Users"


function Home() {
  return (
    <>
      <Sidebar />
      <div className="container">
        <h1>Home Page</h1>
        <Users />
      </div>
    </>
  )
}

export default Home