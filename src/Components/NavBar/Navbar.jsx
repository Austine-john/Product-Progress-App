import "./Navbar.css" ;
export default function Navbar(){

    return(
        <nav className="navbar">
            <div className="left-nav">
            <img src="logo.png" alt="Logo" />
            <h2>Product Tracker</h2>
            </div>

            <ul className="nav-links">
                <li><a href="Dashboard">Dashboard</a></li>
                <li><a href="Team Management">Team Management</a></li>
                <li><a href="Reports">Reports</a></li>
                <li><a href="Products">Products</a></li>
            </ul>
        </nav>
    )
}