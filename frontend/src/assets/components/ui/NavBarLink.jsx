import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
const NavBarLink = () => {

  const { isAuthenticated, setIsAuthenticated, username } = useContext(AuthContext)

  function logout() {
    setIsAuthenticated(false)
    localStorage.removeItem("access")
  }

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink to="/"
          className={({ isActive }) => isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"}
          end style={{ color: "white" }}>
          Home

        </NavLink>
      </li>
      {isAuthenticated ?

        (<>
          <li className="nav-item">
            <NavLink to="/profile"
              className={({ isActive }) => isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"}
              end style={{ color: "white" }}>
              {`Hi,${username}`}

            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/" onClick={logout}
              className={({ isActive }) => isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"}
              end style={{ color: "white" }}>
              Logout

            </NavLink>
          </li>
        </>
        )
        :
        (
          <>
            <li className="nav-item">
              <NavLink to="/login"
                className={({ isActive }) => isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"}
                end style={{ color: "white" }}>
                Login

              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register"
                className={({ isActive }) => isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"}
                end style={{ color: "white" }}>
                Register

              </NavLink>
            </li>

          </>
        )
      }
    </ul>
  )
}

export default NavBarLink
