import { Outlet } from "react-router-dom"
import Header from "./Header"


export const AppLayout = ({search, setSearch}) => {
    return (
      <>
        <Header search={search}setSearch={setSearch} />
        <Outlet />
      </>
    )
  }