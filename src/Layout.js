import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();

    return (
        <>
            <ThemeProvider
                breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
                minBreakpoint="xxs">
                <Navbar bg="dark" data-testid="layout">
                    <img
                        alt=""
                        src={require('./assets/images/tmdb.svg').default}
                        width="30"
                        height="30"
                        className="d-inline-block align-top w-10 ml-25"
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Movies" id="nav-dropdown">
                                <NavDropdown.Item as={Link} to={"/movies/popular"} >Popular</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/movies/now_playing"} >Now Playing</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/movies/upcoming"}>Upcoming</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/movies/top_rated"}>Top Rated</NavDropdown.Item>
                                {/* <NavDropdown.Divider /> */}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                    {location.pathname !== '/favourites' && (
                            <Link to={"/favourites"}>
                                <img
                                    alt="favourite icon"
                                    src={require("./assets/images/red-like.svg").default}
                                    className='fav-icon'
                                />
                            </Link>
                        )}
                    
                </Navbar.Collapse>                                                                                                                                                                                      
            </Navbar>

            <Outlet />
        </ThemeProvider>
        </>
    );
};

export default Layout;
