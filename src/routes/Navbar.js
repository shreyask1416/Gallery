import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import {
  NavLink,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import Home from '../components/Home/Home';
import Footer from '../components/Footer/Footer';
import Photos from '../components/Photos/Photos';
import Videos from '../components/Videos/Videos';
import Favourites from '../components/Favourites/Favourites';
import VideoPlay from '../components/VideoPlay/VideoPlay';
import PhotoDetails from '../components/PhotoDetails/PhotoDetails';
const Navbar = () => {
  const location = useLocation();
  const path = location.pathname.split('/');
  const [search, setSearch] = useState('animal');
  return (
    <div className={styles.Router}>
      <Home search={(value) => { value ? setSearch(value) : setSearch('animal'); }} />
      {path[1] === 'PhotoDetails' || path[1] === 'VideoPlay' ? null : (
        <div className={styles.NavBar}>
          <NavLink
            className={styles.home}
            exact activeClassName={styles.active}
            to="/"
          >
            Photos
        </NavLink>
          <NavLink
            className={styles.vid}
            activeClassName={styles.active}
            to="/videos"
          >
            Videos
        </NavLink>
          <NavLink
            className={styles.favo}
            activeClassName={styles.active}
            to="/Favourites"
          >
            Favourites
        </NavLink>
        </div>)}

      <Switch>
        <Route exact path="/">
          <Photos search={path[1] === '' ? search : 'animal'} />
        </Route>
        <Route exact path="/videos">
          <Videos search={path[1] === 'videos' ? search : 'animal'} />
        </Route>
        <Route exact path="/Favourites">
          <Favourites />
        </Route>

        <Route exact path="/VideoPlay/:id">
          <VideoPlay />
        </Route>
        <Route exact path="/PhotoDetails/:id">
          <PhotoDetails />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
};

export default Navbar;
