// import { FaCartShopping } from "react-icons/fa6"
// import { Link } from "react-router-dom"
// import styles from "./NavBar.module.css"
// import NavBarLink from "./NavBarLink"
// const Navbar = ({numCartItems}) => {
//     return (
//         <nav className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 ${styles.stickyNavbar}`}>
//             <div className="container">
//                 <Link className="navbar-brand fw-bold text-uppercase" to="/">META</Link>

//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls='navbarContent' aria-expanded="false" aria-label='Toggle naviagtion'>
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id='navbarContent'>
//                     <NavBarLink />
//                     <Link to="/cart" className={`btn btn-dark ms-3 rounded-pill position-relative ${styles.responsiveCart}`}>
//                         <FaCartShopping />
//                         {numCartItems == 0 || <span className= "position-absolute top-0 start-100 translate-middle badge rounded-pill" 
//                         style={{fontSize:'0.85rem',padding:'0.5em 0.65em',backgroundColor:'#6050DC'}}>
//                         {numCartItems}
//                         </span>}
//                     </Link>
//                 </div>
//             </div>

//         </nav>
//     )
// }

// export default Navbar


import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import NavBarLink from "./NavBarLink";
import pic from "../../../assets/coep.png"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const Navbar = ({ numCartItems }) => {
    const { isAuthenticated, setIsAuthenticated, username } = useContext(AuthContext);

    return (
        <nav
            className={`navbar navbar-expand-lg navbar-light shadow-sm py-3 ${styles.stickyNavbar}`}
            style={{ background:"linear-gradient(135deg,rgb(74, 75, 76),rgb(0, 0, 0))"}} // Matte Black Navbar
        >
            <div className="container">
                {/* Brand Name */}
                {/* <img src={pic} alt="Coep" style={{objectFit:"contain",width: "auto",height: "40px",padding:"4px"}} /> */}
                <Link
                    className="navbar-brand fw-bold text-uppercase"
                    to="/"
                    style={{ color: "#FFFFFF", fontSize: "1.3rem", letterSpacing: "1px" }} // Bright White Logo
                >
                    META CANTEEN
                </Link>

                {/* Navbar Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ backgroundColor: "black", border: "1px solid white", padding: "8px 10px", borderRadius: "5px" }} >
                    <span
                        className="navbar-toggler-icon"
                        style={{ filter: "invert(1)" }} // Makes the default black icon white
                    ></span>
                </button>



                {/* Navbar Links & Cart */}
                <div className="collapse navbar-collapse" id='navbarContent'>
                    <NavBarLink />

                    {/* Shopping Cart Button */}
                    {isAuthenticated && username !=="admin" && <Link
                        to="/cart"
                        className={`btn ms-3 rounded-pill position-relative ${styles.responsiveCart}`}
                        style={{ backgroundColor: "#FFFFFF", color: "#000000", border: "1px solid #FFFFFF" }} // White Button with Black Text
                    >
                        <FaCartShopping />
                        {numCartItems === 0 || (
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                                style={{ fontSize: '0.85rem', padding: '0.5em 0.65em', backgroundColor: 'red', color: "white" }} // Dark Gray Badge
                            >
                                {numCartItems}
                            </span>
                        )}
                    </Link>}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
