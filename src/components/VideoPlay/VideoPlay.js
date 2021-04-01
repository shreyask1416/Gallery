import React, { useEffect, useRef } from 'react';
import outlineHeart from '../../assets/video-favorite.png';
import playButton from '../../assets/Shape Copy 7.png';
import styles from './VideoPlay.module.scss';
import { useLocation } from 'react-router-dom';
import oval from '../../assets/Group 2/Oval Copy.png';
import { useUser } from '../../ContextApis/ProvideUser';
import filledHeart from '../../assets/video-facorite-deselct.png';
const VideoPlay = () => {
  const { fav, setFav } = useUser();
  const location = useLocation();
  const path = location.pathname.split('/');
  let videoref = useRef(null);
  let videodata = JSON.parse(localStorage.getItem('video')) || '{}';
  let Video = videodata.filter(
    (ele, ind) =>
      ind ===
      videodata.findIndex(
        (elem) =>
          elem.id === ele.id
      )
  );
  useEffect(() => {
    localStorage.setItem('Fav', JSON.stringify([...fav]));
  }, [fav]);
  const [show, setShow] = React.useState(true);
  const playVideo = () => {

    videoref.current.play();
    setShow(prev => !prev);
  };



  return (<div className={styles.VideoPlay}>
    {Video.filter((ele) => ele.id === path[2] * 1)
      .map((ele, i) => {
        return (<div className={styles.PlayerDiv} key={i}>
          <video ref={videoref} width="925" height="522" controls className={styles.VideoPlayer} >
            <source src={ele.video_files[0].link} type="video/mp4" />
          </video>
          <div onClick={() => { playVideo(); }}>
            <img className={show ? styles.PlayBtn : styles.PlayBtnHide} src={playButton} />
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          <img src={oval} className={styles.OvalImg}></img>
          <h3>{ele.user.name}</h3>
          <button
            className={styles.Button}
            onClick={() => {
              {
                fav.find((elem) => {
                  return elem === ele.id;
                })
                  ? setFav(
                    fav.filter((elem) => elem !== ele.id),
                  )
                  : setFav((fav) => [...fav, ele.id]);
              }
            }
            }
          >
            {fav.find((elem) => {
              return elem === ele.id;
            }) ? (
              <img
                src={outlineHeart}
                className={styles.filled}
              />
            ) : (
              <img
                src={filledHeart}
                className={styles.outline}
              />
            )}
          </button>
        </div>
        );
      })}
  </div>);
};

export default VideoPlay;
