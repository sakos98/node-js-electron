import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

const App = () => {
  const status = {
    off: "off",
    work: "work",
    rest: "rest",
  };

  const [statuses, setStatuses] = useState(status.off);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const formatTime = (myTime) => {
    let minutes = Math.floor(myTime / 60);
    let seconds = myTime - minutes * 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const start = () => {
    setStatuses(status.work);
    setTime(1200);
    setTimer(
      setInterval(() => {
        setTime((time) => time - 1);
      }, 1000)
    );
  };

  const stop = () => {
    setTimer(clearInterval(timer));
    setStatuses(status.off);
    setTime(0);
  }

  const playBell = () => {
    const bell = new Audio("./sounds/bell.wav");
    bell.play();
  };

  useEffect(() => {
    if (time === 0 && statuses === status.work) {
      playBell();
      setStatuses(status.rest);
      setTime(60);
    } else if (time === 0 && statuses === status.rest) {
      playBell();
      setStatuses(status.work);
      setTime(1200)
    }
  });

  const closeApp = () => {
    window.close();
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      {statuses === status.off && (
        <div>
          <p>
            According to optometrists in order to save your eyes, you should
            follow the 20/20/20. It means you should to rest your eyes every 20
            minutes for 20 seconds by looking more than 20 feet away.
          </p>
          <p>
            This app will help you track your time and inform you when it's time
            to rest.
          </p>
        </div>
      )}

      {statuses === status.work && <img src="./images/work.png" />}
      {statuses === status.rest && <img src="./images/rest.png" />}
      {statuses !== status.off && (<div className="timer">{formatTime(time)}</div>)}

      {statuses === status.off && (<button className='btn' onClick={() => start()}>Start</button>)}
      {statuses !== status.off && (<button className='btn' onClick={() => stop()}>Stop</button>)}

      <button className="btn btn-close" onClick={() => closeApp()}>X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
