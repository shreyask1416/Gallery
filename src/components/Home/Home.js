import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import logo from '../../assets/1.0. Home - Photos/Logo.png';
import DarkLogo from '../../assets/Logo.png';
import styles from './Home.module.scss';
const Home = ({ search = () => { }, }) => {
  const [imgs, setImgg] = React.useState([]);
  const [text, setText] = useState('');
  //To get the banner image
  const getBanner = () => {
    fetch('https://api.pexels.com/v1/curated?per_page=2', {
      headers: {
        Authorization:
          '563492ad6f91700001000001935ceb59486643be884e6b248f72ecd5',
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setImgg(data.photos[1].src.landscape);
      });
  };

  useEffect(() => {
    getBanner();
  }, []);
  const [show, setShow] = useState(false);
  let history = useHistory();

  //scrolling event
  const changeBackground = () => {
    if (window.scrollY > 15) {
      setShow(true);
    } else if (window.scrollY < 200) {
      setShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => window.removeEventListener('scroll', changeBackground);

  }, []);
  window.addEventListener("scroll", changeBackground);
  const location = useLocation();
  const path = location.pathname.split('/');
  function handleSubmits(event) {
    event.preventDefault();
    history.push(path[1] === 'PhotoDetails' ? '/' : '/videos');
    search(text);
  }
  function handleSubmit(event) {
    event.preventDefault();
    search(text);
  }

  let Value = path[1] === 'PhotoDetails' || path[1] === 'VideoPlay' ? true : false;
  return (
    <div className={styles.Home}>
      {show || Value ? (
        <div className={show || Value ? styles.mask : styles.maskHide}>
          <img className={styles.logos} src={DarkLogo} />
          <form className={styles.bgSmall} onSubmit={handleSubmits}>
            <input
              type="text"
              placeholder="Search photos, videos, artists"
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></input>
            <div className={styles.bgsSmall} onClick={() => handleSubmits}>
              <span className={styles.tagSmall}>SEARCH</span>
            </div>
          </form>

        </div>
      ) : (
        <div
          style={{
            backgroundImage: 'url(' + imgs + ')',
            backgroundSize: 'cover',

          }}
          className={show === false || Value === false ? styles.Banner : styles.BannerHide}
        >
          <img className={styles.logos} src={logo} />
          <h1>Discover the world’s best photos & videos</h1>
          <h2>Best memories online</h2>
          <form className={styles.bg} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search photos, videos, artists"
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></input>
            <div className={styles.bgsMask} onClick={() => handleSubmit}>
              <span className={styles.tag}>SEARCH</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;