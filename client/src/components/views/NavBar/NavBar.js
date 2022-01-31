import React from 'react';
import { Link, Outlet } from 'react-router-dom'
import { Menu } from 'antd'
import './NavBar.css'

function NavBar() {

  return (
    <div>
    {/* A "layout route" is a good place to put markup you want to
        share across all the pages on your site, like navigation. */}
    <nav>
      <Menu mode='horizontal'>
        <Menu.Item key="home">
          <Link to="/">홈</Link>
        </Menu.Item>
        <Menu.Item key="champion">
          <Link to="/champion">챔피언</Link>
        </Menu.Item>
        <Menu.Item key="arma">
        <Link to="/arma">칼바람</Link>
        </Menu.Item>
      </Menu>
    </nav>

    <hr />

    {/* An <Outlet> renders whatever child route is currently active,
        so you can think about this <Outlet> as a placeholder for
        the child routes we defined above. */}
    <Outlet />
  </div>);
}

export default NavBar;