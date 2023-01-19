import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { authActions } from '../../store/auth-slice';

import { AiOutlineSearch } from 'react-icons/ai';
import { FiPackage } from 'react-icons/fi';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';

const MainNavigation = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onLogoutHandler = () => {
    if (!auth.isAuth && !auth.authData) {
      return;
    }
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>SmartFix</div>
      {auth.isAuth && auth.authData && (
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink
                to="/parcels"
                className={(navData) =>
                  navData.isActive ? classes.active : ''
                }
              >
                Parcels
                <FiPackage className={classes.icon}></FiPackage>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search"
                className={(navData) =>
                  navData.isActive ? classes.active : ''
                }
              >
                Search
                <AiOutlineSearch className={classes.icon}></AiOutlineSearch>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={(navData) =>
                  navData.isActive ? classes.active : ''
                }
              >
                DashBoard
                <MdOutlineDashboardCustomize
                  className={classes.icon}
                ></MdOutlineDashboardCustomize>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={classes.logout}
                onClick={onLogoutHandler}
                to="/login"
              >
                LOGOUT
                <BiLogOut className={classes.icon}></BiLogOut>
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default MainNavigation;
