import { Link } from "react-router-dom";
import "./gameHome.css";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { UserGameContext } from "../dataUser";

function GameHome() {
  const { userData, updateUserInfo } = useContext(UserGameContext); // Access userData and updateUserInfo

  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Show SweetAlert to confirm the user's input
    Swal.fire({
      title: "ยืนยันข้อมูล",
      text: `ชื่อผู้ใช้: ${userName}\nเลขที่: ${userId}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f6aff",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        // Log the user info to the console (or handle as needed)
        console.log("User Name:", userName);
        console.log("User ID:", userId);
        Swal.fire(
          "บันทึกข้อมูลสำเร็จ!",
          "ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว.",
          "success"
        );
        updateUserInfo(userName, userId);
        setUserName(""); // Clear the input fields
        setUserId("");
      }
    });
  };

  return (
    <div className="content">
      {/* Display user data from context */}
      <div className="user-info">
        {userData ? (
          <div className="userText">
            <h1>
              <strong>ชื่อผู้ใช้ :</strong> {userData.userName}
            </h1>
            <h1>
              <strong>เลขที่ :</strong> {userData.userId}
            </h1>
          </div>
        ) : (
          <p>ยังไม่ได้กรอกข้อมูลผู้ใช้</p>
        )}
      </div>
      {/* Form to enter user data */}
      <form onSubmit={handleSubmit} className="form_user">
        <input
          type="text"
          placeholder="กรุณากรอกชื่อผู้ใช้"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="กรุณากรอกเลขที่"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit">บันทึกข้อมูล</button>
      </form>

      <h1 className="topic">Game All</h1>

      <div className="All_game">
        <Link to="/game1" className="card_game">
          Image Memory Test
        </Link>
        <Link to="/game2" className="card_game">
          ColorAndText Memory Test
        </Link>
        {/* <Link to="/form1" className="card_game">
          form Image Memory Test
        </Link>
        <Link to="/form2" className="card_game">
          form ColorAndText Memory Test
        </Link> */}
        <Link to="/exportdata" className="card_game">
          ExportData
        </Link>
      </div>
    </div>
  );
}

export default GameHome;
