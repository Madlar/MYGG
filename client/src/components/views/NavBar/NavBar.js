import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import { Space, Input } from 'antd'
import './NavBar.css'
import { useLocation } from 'react-router-dom';

const { Search } = Input

function NavBar() {

  const [isHome, setIsHome] = useState("");
  const path = useLocation().pathname.substring(1)

  //location 변화 감지
  useEffect(() => {
    if (path.length == 0) {
      setIsHome(true)
    }
    else {
      setIsHome(false)
    }
  }, [path]);//https://reactrouter.com/docs/en/v6/api#uselocation 참조

  const navigate = useNavigate()

  const [Name, setName] = useState("");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onSearchHandler = (event) => {
    navigate(`/summoner/userName=${Name}`, { state: {} })
    window.location.reload()
  }

  if (isHome) {//현재 주소가 렌딩페이지이면 검색창을 없앰
    return (
      <div>
        {/* A "layout route" is a good place to put markup you want to
        share across all the pages on your site, like navigation. */}
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1da57a' }}>
          <div style={{ width: '1300px' }}>
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
          </div>
        </nav>

        {/* An <Outlet> renders whatever child route is currently active,
        so you can think about this <Outlet> as a placeholder for
        the child routes we defined above. */}
        <Outlet />
      </div>
    )
  }

  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
        share across all the pages on your site, like navigation. */}
      <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1da57a' }}>
        <div style={{ width: '900px' }}>
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
        </div>
        <div style={{}}>
          <div style={{ width: '400px' }}>
            <Search
              placeholder="소환사명"
              enterButton="Search"
              size="medium"
              value={Name}
              onChange={onNameHandler}
              onSearch={onSearchHandler}
            />
          </div>
        </div>
      </nav>

      {/* An <Outlet> renders whatever child route is currently active,
        so you can think about this <Outlet> as a placeholder for
        the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default NavBar;