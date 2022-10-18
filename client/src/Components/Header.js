import React, { useContext } from 'react';
import { NavLink} from 'react-router-dom';
import { Context } from '../Context'

//Header present throughout the app that  uses context to determine the authentication status and render the appropriate NavLink
const Header = (props) => {
    const user = useContext(Context)
    return(
    <header>
    <div className="wrap header--flex">
        <h1 className="header--logo"><NavLink to="/">Courses</NavLink></h1>
        <nav>
        {user.authenticatedUser ? (
              <React.Fragment>
              <ul className="header--signedin">
                <li>Welcome, {user.authenticatedUser.firstName} {user.authenticatedUser.lastName}</li>
                <li><NavLink to="/signout">Sign Out</NavLink></li>
             </ul>
            </React.Fragment>
        ) : (
            <React.Fragment>
             <ul className="header--signedout">
                <li>
                <NavLink to="/signup">Sign Up</NavLink>
                </li>
                <li>
                <NavLink to="/signin">Sign In</NavLink>
                </li>
            </ul>
             </React.Fragment>
        )}
        </nav>
    </div>
    </header>
    )
}

export default Header;