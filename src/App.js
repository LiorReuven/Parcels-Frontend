import React, { useContext, useEffect } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import io from 'socket.io-client'

import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import ParcelsPage from './pages/ParcelsPage';
import SearchParcelPage from './pages/SearchParcelPage';
import DashboardPage from './pages/DashboardPage';

//Thunk Actions
import { fetchAllParcels } from './store/allParcels-thunk';
import { fetchStorages } from './store/Storages/storage-thunk';

import { SocketContext } from './context/socket';
import StoragesPage from './pages/DashboardSubs/StoragesPage';
import CreateStoragePage from './pages/DashboardSubs/CreateStoragePage';
import ReportsPage from './pages/DashboardSubs/ReportsPage';

const App = () => {
  const auth = useSelector((state) => state.auth);

  const socket = useContext(SocketContext);

  const dispatch = useDispatch();

  socket.on('response_fetch', (data) => {
    dispatch(fetchAllParcels());
  });

  useEffect(() => {
    dispatch(fetchAllParcels());

    dispatch(fetchStorages());

    console.log('fetched parcels');
  }, [dispatch]);

  // remove console logs

  if (process.env.NODE_ENV === 'production')
    console.log = function no_console() {};

  return (
    <Layout>
      <Routes>
        {auth.isAuth && auth.authData && (
          <Route path="/parcels" element={<ParcelsPage />} />
        )}
        {auth.isAuth && auth.authData && (
          <Route path="/search" element={<SearchParcelPage />} />
        )}
        {auth.isAuth && auth.authData && (
          <Route
            path="/dashboard/*"
            element={
              <>
                <DashboardPage />
                <Outlet />
              </>
            }
          >
            <Route path="storages" element={<StoragesPage />} />
            <Route path="storages/edit/:id" element={<CreateStoragePage />} />
            <Route path="storages/create" element={<CreateStoragePage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
        )}

        {!auth.isAuth && !auth.authData && (
          <Route path="/login" element={<LoginPage />} />
        )}
        <Route
          path="/*"
          element={
            !auth.isAuth || !auth.authData ? (
              <Navigate replace to="/login" />
            ) : (
              <Navigate replace to="/parcels" />
            )
          }
        />
      </Routes>
    </Layout>
  );
};

export default App;
