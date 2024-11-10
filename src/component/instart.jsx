// components/GameInstructionScreen.js
import './instart.css';
import PropTypes from 'prop-types';

const GameInstructionScreen = ({ gameNumber, onStart }) => {
  const gameInstructions = {
    1: {
      title: "เกมทดสอบความจำภาพ (Image Memory Test)",
      description: "ทดสอบความสามารถในการจดจำและจำแนกภาพ",
      instructions: [
        "จะมีภาพแสดงขึ้นมา 9 ภาพ ให้คุณจดจำภาพเหล่านั้นภายในเวลา 30 วินาที",
        "หลังจากนั้น จะมีภาพใหม่แสดงขึ้นมา 9 ภาพ โดย 1 ภาพจะถูกสลับสับเปลี่ยน",
        "ให้คุณเลือกภาพที่ถูกเปลี่ยนแปลงไป",
        "มีทั้งหมด 5 รอบ คะแนนเต็ม 5 คะแนน",
        "สามารถคลิกที่ภาพเพื่อขยายได้"
      ]
    },
    2: {
      title: "เกมทดสอบความจำสี (Color Memory Test)",
      description: "ทดสอบความสามารถในการจดจำสีและข้อความ",
      instructions: [
        "จะมีข้อความสีแสดงขึ้นมา 6 ข้อความ โดยสีของข้อความจะไม่ตรงกับความหมาย",
        "ให้คุณจดจำความหมายของข้อความภายในเวลา 5 วินาที",
        "หลังจากนั้น ให้เลือกสีที่ตรงกับความหมายของข้อความที่จำได้",
        "สามารถเลือกได้หลายสี",
        "มีทั้งหมด 5 รอบ คะแนนเต็มรอบละ 6 คะแนน"
      ]
    }
  };

  const currentGame = gameInstructions[gameNumber];

  return (
    <div className="instruction-screen">
      <div className="instruction-card">
        <div className="card-header">
          <h2 className="card-title">{currentGame.title}</h2>
          <p className="card-description">{currentGame.description}</p>
        </div>
        <div className="card-content">
          <div className="instruction-box">
            <h3>วิธีการเล่น:</h3>
            <ul>
              {currentGame.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
          <div className="button-container">
            <button className="start-button" onClick={onStart}>
              เริ่มเกม
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

GameInstructionScreen.propTypes = {
  gameNumber: PropTypes.number.isRequired,
  onStart: PropTypes.func.isRequired,
};


export default GameInstructionScreen;