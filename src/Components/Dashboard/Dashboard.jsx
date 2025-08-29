import Navbar from "../NavBar/Navbar";
import SearchBar from "../Common/SearchBar";
import "./Dashboard.css" ;

export default function Dashboard(){

    return(
        <div className="dashboard">
        <Navbar />
        <SearchBar className="search-bar" />
        </div>
    )
}