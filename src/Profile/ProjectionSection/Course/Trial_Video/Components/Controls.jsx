import React from "react";
import {
  makeStyles,
  Slider,
  withStyles,
  Button,
  Tooltip,
  Popover,
  Grid,
} from "@material-ui/core";
import {
  FastForward,
  FastRewind,
  Pause,
  PlayArrow,
  SkipNext,
  VolumeUp,
  VolumeOff,
  Fullscreen
} from "@material-ui/icons";
import "./Controls.css";

const useStyles = makeStyles({
  volumeSlider: {
    width: "100px",
    color: "#9556CC",
  },

  bottomIcons: {
    color: "#999",
    padding: "12px 8px",

    "&:hover": {
      color: "#fff",
    },
  },
});

const PrettoSlider = withStyles({
  root: {
    height: "20px",
    color: "#9556CC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#9556CC",
    border: "2px solid currentColor",
    marginTop: -3,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 5,
    borderRadius: 4,
    width: "100%",
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})(Slider);

const Controls = ({
  onPlayPause,
  playing,
  onRewind,
  onForward,
  played,
  onSeek,
  onSeekMouseUp,
  onVolumeChangeHandler,
  onVolumeSeekUp,
  volume,
  mute,
  onMute,
  duration,
  currentTime,
  onMouseSeekDown,
  controlRef,
  cor,
  fullScreenMode,
  index
}) => {
  const classes = useStyles();


  return (
    <div className="control_Container" ref={controlRef}>
      <div className="top_container">
        <h2>{cor}</h2>
      </div>
      <div className="mid__container">
        <div className="icon__btn" onDoubleClick={onRewind}>
          <FastRewind fontSize="medium" />
        </div>

        <div className="icon__btn" onClick={onPlayPause}>
          {playing ? (
                  <a className="play-button">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50">
                        <path style={{ transform: 'translateX(13px) translateY(12px)' }}  d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z" fill="#1C274C"></path> 
                        <path style={{ transform: 'translateX(13px) translateY(12px)'  }} d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z" fill="#1C274C"></path> 
                      </svg>
                  </a>
          ) : (
       <a className="play-button">
         <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50">
           <path d="M42.7,42.7L25,50L7.3,42.7L0,25L7.3,7.3L25,0l17.7,7.3L50,25L42.7,42.7z" className="polygon"></path>
           <polygon points="32.5,25 21.5,31.4 21.5,18.6 "></polygon>
         </svg>
       </a>
          )}
        </div>

        <div className="icon__btn">
          <FastForward fontSize="medium" onDoubleClick={onForward} />
        </div>
      </div>
      <div className="bottom__container">
        <div className="slider__container">
          <PrettoSlider
            min={0}
            max={100}
            value={played * 100}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
            onMouseDown={onMouseSeekDown}
          />
        </div>
        <div className="control__box">
          <div className="inner__controls">
            <div className="icon__btn" onClick={onPlayPause}>
              {playing ? (
                <Pause fontSize="medium" />
              ) : (
                <PlayArrow fontSize="medium" />
              )}{" "}
            </div>

            <div className="icon__btn">
              <SkipNext fontSize="medium" />
            </div>

            <div className="icon__btn" onClick={onMute}>
            {mute ? (
                  <VolumeOff fontSize="medium" />
                ) : (
                  <VolumeUp fontSize="medium" />
                )}
            </div>

            <Slider
              className={`${classes.volumeSlider} ntr`}
              onChange={onVolumeChangeHandler}
              value={volume * 100}
              onChangeCommitted={onVolumeSeekUp}
            />

            <span id="vid_time">{ currentTime} : {duration}</span>
          </div>
            <Fullscreen className="iconbtn" style={{cursor:"pointer"}} onClick={fullScreenMode}/>
          
        </div>
      </div>
    </div>
  );
};

export default Controls;
