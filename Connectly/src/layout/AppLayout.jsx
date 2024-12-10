import { Outlet } from "react-router-dom"
import MainNav  from "./MainNav"


export const AppLayout = ({search, setSearch, triggerSearch}) => {
    return (
      <>
        <MainNav search={search}setSearch={setSearch} triggerSearch={triggerSearch} />
        <Outlet />
      </>
    )
  }