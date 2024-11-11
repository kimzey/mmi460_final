import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import './gameTest2.css';
import { UserGameContext } from '../dataUser';
import { useNavigate } from "react-router-dom";
import GameInstructionScreen from './instart';


const allColors = [
  { text: "สีฟ้า", color: "#00A1E4" },
  { text: "สีเขียว", color: "#00AD2B" },
  { text: "สีเหลือง", color: "#FFD700" },
  { text: "สีม่วง", color: "#800080" },
  { text: "สีแดง", color: "#FF0000" },
  { text: "สีส้ม", color: "#FFA500" },
  { text: "สีน้ำเงิน", color: "#0000FF" },
  { text: "สีดำ", color: "#000000" }
];

const shuffleArray = (array) => {
  return array.map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value);
};

const MemoryTestGame = () => {
  const navigate = useNavigate(); // เรียกใช้ useNavigate
  const [showInstructions, setShowInstructions] = useState(true);

  const { userData, updateGameData } = useContext(UserGameContext);

  const [currentRound, setCurrentRound] = useState(1);
  const [showTest, setShowTest] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [displayColors, setDisplayColors] = useState([]);
  const [answerOptions, setAnswerOptions] = useState([]);

  const [timeRemaining, setTimeRemaining] = useState(5);
  const [roundStartTime, setRoundStartTime] = useState(null);
  const [roundResults, setRoundResults] = useState([]);
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  // สร้างชุดสีใหม่สำหรับแต่ละรอบ
  const generateNewRound = () => {
    const shuffled = shuffleArray([...allColors]);
    const display = shuffled.slice(0, 6);
    const decoy = shuffled.slice(6);
    
    const shuffledDisplay = shuffleArray(display).map((item, index) => ({
      ...item,
      displayColor: display[(index + 1) % display.length].color
    }));

    setDisplayColors(shuffledDisplay);
    setAnswerOptions(shuffleArray([...display, ...decoy]));
  };
  

  // ตั้งค่าเริ่มต้นสำหรับแต่ละรอบ
  useEffect(() => {
    if (showTest) {
      generateNewRound();
      setTimeRemaining(5);
      setShowTimeWarning(false);
    }
  }, [currentRound, showTest]);


  // นับถอยหลัง 5 วินาที
  useEffect(() => {
    let timer;
    if (showTest && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setShowTest(false);
            setRoundStartTime(Date.now());
            setShowTimeWarning(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showTest, timeRemaining]);

  const handleColorSelect = (color) => {
    if (selectedAnswers.includes(color.text)) {
      setSelectedAnswers(selectedAnswers.filter(item => item !== color.text));
    } else {
      setSelectedAnswers([...selectedAnswers, color.text]);
    }
  };

  const handleSubmit = () => {
    const endTime = Date.now();
    const timeTaken = (endTime - roundStartTime) / 1000; // เวลาที่ใช้ในวินาที
    
    const correctAnswers = displayColors.map(c => c.text);
    const score = selectedAnswers.filter(answer => correctAnswers.includes(answer)).length;
    const incorrectSelections = selectedAnswers.filter(answer => !correctAnswers.includes(answer)).length;
    
    const roundResult = {
      round: currentRound,
      score,
      incorrectSelections,
      timeTaken,
      totalPossibleScore: displayColors.length
    };

    setRoundResults([...roundResults, roundResult]);
    
    if (currentRound < 5) {
      // Replace alert with SweetAlert2
      Swal.fire({
        title: `รอบที่ ${currentRound}`,
        html: `ตอบถูก ${score} สี จากทั้งหมด ${displayColors.length} สี<br>เลือกสีที่ไม่มี ${incorrectSelections} สี<br>ใช้เวลา ${timeTaken.toFixed(2)} วินาที`,
        icon: 'info',
        confirmButtonText: 'ไปยังรอบถัดไป'
      }).then(() => {
        setCurrentRound(currentRound + 1);
        setSelectedAnswers([]);
        setShowTest(true);
        setGameComplete(false);
      });
    } else {
      const finalResults = [...roundResults, roundResult];
      const totalCorrect = finalResults.reduce((sum, r) => sum + r.score, 0);
      const totalIncorrect = finalResults.reduce((sum, r) => sum + r.incorrectSelections, 0);
      const totalTime = finalResults.reduce((sum, r) => sum + r.timeTaken, 0);

      // Show final results using SweetAlert2
      Swal.fire({
        title: 'จบการทดสอบ!',
        html: `
          คะแนนรวม: ${totalCorrect} จาก ${finalResults.length * 6}<br>
          เลือกสีที่ไม่มีรวม: ${totalIncorrect}<br>
          เวลาเฉลี่ยต่อรอบ: ${(totalTime / 5).toFixed(2)} วินาที<br><br>
          ผลแต่ละรอบ:<br>
          ${finalResults.map(r => 
            `รอบ ${r.round}: ถูก ${r.score}/${r.totalPossibleScore}, ` +
            `ผิด ${r.incorrectSelections}, เวลา ${r.timeTaken.toFixed(2)} วินาที`
          ).join('<br>')}
        `,
        icon: 'success',
        confirmButtonText: 'เริ่มใหม่'
      }).then(() => {
        setGameComplete(true);
        updateGameData("game2",finalResults)
        console.log(userData);
        navigate("../form2")
      });
    }
  };

  const handleReset = () => {
    setCurrentRound(1);
    setShowTest(true);
    setSelectedAnswers([]);
    setGameComplete(false);
    setRoundResults([]);
    setShowTimeWarning(false);
  };

  const handleStartGame = () => {
    setShowInstructions(false);
  };

  if (showInstructions) {
    return <GameInstructionScreen gameNumber={2} onStart={handleStartGame} />;
  }



  return (
    <div className="container">
      <h1 className="heading">การทดสอบที่ 3 (รอบที่ {currentRound}/5)</h1>
      {showTest ? (
        <div className="space-y-6">
          <p className="text-lg">
            ให้ผู้เข้าร่วมการทดลองจดจำภาพเหล่านี้ ที่มีข้อความสีในแต่ละสี ที่สีกับข้อความจะแตกต่างออกจากกัน
          </p>
          <div className="text-center text-xl font-bold mb-4">
            เวลา: {timeRemaining} วินาที
          </div>
          <div className="grid grid-md">
            {displayColors.map((item, index) => (
              <div
                key={index}
                className="card"
                style={{ color: item.displayColor }}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {showTimeWarning && (
            <p className="text-lg text-center text-red-500">หมดเวลาดูโจทย์!</p>
          )}
          <p className="text-lg">
            เลือกสีที่คุณจำได้จากความหมายของข้อความ (สามารถเลือกได้หลายสี)
          </p>
          <div className="grid grid-md">
            {answerOptions.map((item, index) => (
              <button
                key={index}
                onClick={() => handleColorSelect(item)}
                className={`button ${selectedAnswers.includes(item.text) ? 'bg-green' : 'bg-gray'}`}
              >
                {item.text}
              </button>
            ))}
          </div>
          <div className="text-center">
            {!gameComplete ? (
              <button 
                onClick={handleSubmit}
                className="button bg-green"
              >
                {currentRound < 5 ? 'ไปรอบถัดไป' : 'ดูผลการทดสอบ'}
              </button>
            ) : (
              <button   
                onClick={handleReset}
                className="button bg-blue"
              >
                เริ่มใหม่
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryTestGame;
