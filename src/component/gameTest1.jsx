import { useState, useEffect, useMemo } from "react";
import Swal from 'sweetalert2';
import "./gameTest1.css";

function GameTest1() {
  const images = useMemo(() => [
    "image_1.jpg", "image_2.jpg", "image_3.jpg", "image_4.jpg", "image_5.jpg", "image_6.jpg", "image_7.jpg", "image_8.jpg", "image_9.jpg", "image_10.jpg",
    "image_11.jpg", "image_12.jpg", "image_13.jpg", "image_14.jpg", "image_15.jpg", "image_16.jpg", "image_17.jpg", "image_18.jpg", "image_19.jpg", "image_20.jpg",
    "image_21.jpg", "image_22.jpg", "image_23.jpg", "image_24.jpg", "image_25.jpg", "image_26.jpg", "image_27.jpg", "image_28.jpg", "image_29.jpg", "image_30.jpg",
    "image_31.jpg", "image_32.jpg", "image_33.jpg", "image_34.jpg", "image_35.jpg", "image_36.jpg", "image_37.jpg", "image_38.jpg", "image_39.jpg", "image_40.jpg",
    "image_41.jpg", "image_42.jpg", "image_43.jpg", "image_44.jpg", "image_45.jpg", "image_46.jpg", "image_47.jpg", "image_48.jpg", "image_49.jpg", "image_50.jpg",
  ], []);

  const [currentRound, setCurrentRound] = useState(1);
  const [see_img, set_See_img] = useState([]);
  const [showFirstImages, setShowFirstImages] = useState(true);
  const [timer, setTimer] = useState(30);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [indexChage, setIndexChage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [roundStartTime, setRoundStartTime] = useState(null);
  const [roundTimes, setRoundTimes] = useState([]);
  
  // เพิ่ม state สำหรับเก็บข้อมูลการทดลอง
  const [, setExportData] = useState([]);

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

  // เริ่มจับเวลาเมื่อเริ่มให้เลือกภาพ
  useEffect(() => {
    if (!showFirstImages && !loading) {
      setRoundStartTime(Date.now());
    }
  }, [showFirstImages, loading]);

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
    }
  };

  const CheckCurent = () => {
    const isCorrect = selectedIndex === indexChage;
    
    // ถ้ายังไม่เลือกภาพ
    if (selectedIndex === null) {
      Swal.fire({
        title: 'Error!',
        text: 'ลืมกรอกนะ',
        icon: 'error',
      });
      return;
    }
    
    // เก็บเวลาที่ใช้ในรอบนี้
    const timeSpent = Date.now() - roundStartTime;
    setRoundTimes(prev => [...prev, timeSpent]);

    // เพิ่มข้อมูลการทดลองที่ exportData
    setExportData(prev => [
      ...prev,
      {
        round: currentRound,
        selectedImage: see_img[selectedIndex],
        correctImage: see_img[indexChage],
        timeSpent: (timeSpent / 1000).toFixed(2), // เวลาที่ใช้ (วินาที)
        result: isCorrect ? 'ถูกต้อง' : 'ผิด',
      }
    ]);

    // เพิ่มคะแนน
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // รอให้ roundTimes อัพเดทเสร็จก่อนแสดงผล
    setTimeout(() => {
      if (currentRound === 5) {
        const finalScore = isCorrect ? score + 1 : score;
        const roundTimesFormatted = [...roundTimes, timeSpent].map((time, index) => 
          `รอบที่ ${index + 1}: ${(time / 1000).toFixed(2)} วินาที`
        ).join('\n');
        
        Swal.fire({
          title: 'เกมจบแล้ว!',
          html: `
            คะแนนของคุณ: ${finalScore} จาก 5 รอบ
            <br><br>
            เวลาที่ใช้ในแต่ละรอบ:<br>
            <pre>${roundTimesFormatted}</pre>
          `,
          icon: 'info',
          confirmButtonText: 'เริ่มใหม่',
        }).then(() => {
          // รีเซ็ตเกม
          setCurrentRound(1);
          setScore(0);
          setShowFirstImages(true);
          setTimer(30);
          setSelectedIndex(null);
          setRoundTimes([]);
          setExportData([]); // รีเซ็ต exportData
        });
      } else {
        // แสดงผลรอบปกติ
        Swal.fire({
          title: isCorrect ? 'Success!' : 'Error!',
          html: `
            ${isCorrect ? 'ถูกต้องแล้ว' : 'ผิดนะครับ'}<br>
            เวลาที่ใช้: ${(timeSpent / 1000).toFixed(2)} วินาที
          `,
          icon: isCorrect ? 'success' : 'error',
          confirmButtonText: 'รอบต่อไป'
        }).then(() => {
          startNextRound();
        });
      }
    }, 100);
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
          <h1 className="timer">เลือกภาพที่เหมือนกับภาพที่แสดง</h1>
          <div className="table_img">
            {see_img.map((img, index) => (
              <div key={index} className="grid_img" onClick={() => handleImageClick(index)}>
  <img
    src={`/images/${img}`}
    alt={`Image ${index + 1}`}
    className={selectedIndex === index ? 'selected' : ''}
  />
</div>

            ))}
          </div>
          <button className="btn_continue" onClick={CheckCurent}>
            ตอบคำถาม
          </button>
        </div>
      )}
    </div>
  );
}

export default GameTest1;
