import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const UserGameContext = createContext();

const UserGameProvider = ({ children }) => {
  // ข้อมูลผู้ใช้และเกม
  const [userData, setUserData] = useState({
    userName: '',
    userId: '',
    game1: {
      round: 0,
      score: 0,
      incorrectSelections: 0,
      timeTaken: 0,
      totalPossibleScore: 0,
    },
    game2: [],
    formGame1:[],
    formGame2:[],
  });

  // ฟังก์ชันอัปเดตข้อมูลผู้ใช้สำหรับแต่ละเกม
  const updateGameData = (game, newData) => {
    setUserData((prevData) => ({
      ...prevData,
      [game]: { ...prevData[game], ...newData }, // อัปเดตข้อมูลสำหรับเกมที่ระบุ
    }));
  };

  // ฟังก์ชันอัปเดตข้อมูลผู้ใช้ (userName และ userId)
  const updateUserInfo = (userName, userId) => {
    setUserData((prevData) => ({
      ...prevData,
      userName,
      userId,
    }));
  };

  return (
    <UserGameContext.Provider value={{ userData, updateGameData, updateUserInfo }}>
      {children}
    </UserGameContext.Provider>
  );
};

// ประกาศ propTypes
UserGameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserGameContext, UserGameProvider };
