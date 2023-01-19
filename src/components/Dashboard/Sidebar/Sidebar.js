import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

import classes from './Sidebar.module.css';

//icons
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const NavIcon = styled(Link)`
  margin: 15px;
  font-size: 2rem;
  display: flex;
  align-items: center;
  color: white;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 60vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 170px;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 250ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  return (
    <>
      <IconContext.Provider value={{}}>
        <Nav>
          <NavIcon to="#">
            <FaBars onClick={showSidebar} />
          </NavIcon>
          <h1 className={classes.title}>Dashboard</h1>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return (
                <SubMenu
                  showSidebar={showSidebar}
                  item={item}
                  key={index}
                ></SubMenu>
              );
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
