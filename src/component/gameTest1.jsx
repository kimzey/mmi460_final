import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import PropTypes from "prop-types";
import "./gameTest1.css"


function GameTest1({ images }) {
  const [currentRound, setCurrentRound] = useState(1);
  const [see_img, set_See_img] = useState([]);
  const [showFirstImages, setShowFirstImages] = useState(true);
  const [timer, setTimer] = useState(30);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [indexChage, setIndexChage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize images for current round
  useEffect(() => {
    const startIndex = (currentRound - 1) * 10;
    const roundImages = images.slice(startIndex, startIndex + 10);
    set_See_img(roundImages);
  }, [currentRound, images]);

  useEffect(() => {
    if (timer > 0 && showFirstImages) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0 && showFirstImages) {
      handleProceed();
    }
  }, [timer, showFirstImages]);

  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleProceed = () => {
    setLoading(true);
    setTimeout(() => {
      setShowFirstImages(false);

      const randomnumber = Math.floor(Math.random() * 9);
      setIndexChage(randomnumber);

      let chageImg = see_img.slice(0, 9);
      chageImg = shuffle(chageImg);
      chageImg[randomnumber] = see_img[9];

      set_See_img(chageImg);
      setLoading(false);
    }, 1000);
  };

  const handleImageClick = (index) => {
    setSelectedIndex(index);
  };

  const startNextRound = () => {
    if (currentRound < 5) {
      setCurrentRound(prev => prev + 1);
      setShowFirstImages(true);
      setTimer(30);
      setSelectedIndex(null);
    } else {
      // Show final score when game is complete
      setScore(5);
      console.log(score);
      
      Swal.fire({
        title: 'เกมจบแล้ว!',
        text: `คะแนนของคุณ: ${score} จาก 5 รอบ`,
        icon: 'info',
        confirmButtonText: 'เริ่มใหม่',
      }).then(() => {
        // Reset game
        setCurrentRound(1);
        setScore(0);
        setShowFirstImages(true);
        setTimer(30);
        setSelectedIndex(null);
      });
    }
  };

  const CheckCurent = () => {
    const isCorrect = selectedIndex === indexChage;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      Swal.fire({
        title: 'Success!',
        text: 'ถูกต้องแล้ว',
        icon: 'success',
        confirmButtonText: 'รอบต่อไป'
      }).then(() => {
        
        startNextRound();
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'ผิดนะครับ',
        icon: 'error',
        confirmButtonText: 'รอบต่อไป'
      }).then(() => {
        startNextRound();
      });
    }
  };

  return (
    <div className="content">
      <h1 className="topic">Image Memory Test</h1>
      <div className="round-info">
        <p>รอบที่ {currentRound} จาก 5</p>
        <p>คะแนน: {score}</p>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Loading...</h2>
        </div>
      ) : showFirstImages ? (
        <div className="container_img">
          <h1 className="timer">จดจำภาพเหล่านี้ภายในเวลา {timer} วินาที</h1>
          <h2>*** สามารถกดคลิกที่ภาพ เพื่อขยายได้ ***</h2>
          <div className="table_img">
            {see_img.slice(0, 9).map((img, index) => (
              <div key={index} className="grid_img zoom_img">
                <img src={`/images/${img}`} alt={`Image ${index + 1}`} />
              </div>
            ))}
          </div>
          <button className="btn_continue" onClick={handleProceed}>
            ดำเนินการต่อไป
          </button>
        </div>
      ) : (
        <div className="container_img">
          <h1 className="timer">จงเลือกภาพที่เปลี่ยนไป</h1>
          <h2>*** สามารถกดคลิกที่ภาพ เพื่อขยายได้ ***</h2>
          <div className="table_img">
            {see_img.slice(0, 9).map((img, index) => (
              <div key={index} className="grid_img">
                <img
                  src={`/images/${img}`}
                  alt={`Image ${index + 1}`}
                  onClick={() => handleImageClick(index)}
                  className={selectedIndex === index ? "selected" : ""}
                />
              </div>
            ))}
          </div>
          <button className="btn_continue" onClick={CheckCurent}>
            ส่งคำตอบ
          </button>
        </div>
      )}
    </div>
  );
}

// Define prop types for the component
GameTest1.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default GameTest1;