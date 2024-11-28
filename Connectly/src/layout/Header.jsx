import { MainNav } from './MainNav'

const Header = ({search, setSearch}) => {
    return (
      <>
        <MainNav search={search} setSearch={setSearch}/>
      </>
    )
  }

    export default Header;