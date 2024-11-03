import { Link } from "react-router-dom";
import "./gameHome.css";
import { useState } from "react";
import Swal from 'sweetalert2';

function GameHome() {
    // ใช้ useState เพื่อเก็บข้อมูลผู้ใช้
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // ป้องกันการส่งฟอร์มที่ทำให้หน้าเพจรีเฟรช

        // แสดง SweetAlert เพื่อยืนยันข้อมูล
        Swal.fire({
            title: 'ยืนยันข้อมูล',
            text: `ชื่อผู้ใช้: ${userName}\nเลขที่: ${userId}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f6aff',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                // ที่นี่คุณสามารถจัดการกับข้อมูลผู้ใช้ (userName, userId) ได้
                console.log("User Name:", userName);
                console.log("User ID:", userId);
                Swal.fire(
                    'บันทึกข้อมูลสำเร็จ!',
                    'ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว.',
                    'success'
                );
                // คุณสามารถเคลียร์ฟอร์มหลังจากยืนยันได้ที่นี่
                setUserName("");
                setUserId("");
            }
        });
    };

    return (
        <>
            <div className="content">

                {/* ฟอร์มสำหรับกรอกข้อมูลผู้ใช้ */}
                <form onSubmit={handleSubmit} className="form_user">
                    <input
                        type="text"
                        placeholder="กรุณากรอกชื่อผู้ใช้"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)} // อัปเดตสถานะของ userName
                        required
                    />
                    <input
                        type="text"
                        placeholder="กรุณากรอกเลขที่"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)} // อัปเดตสถานะของ userId
                        required
                    />
                    <button type="submit">บันทึกข้อมูล</button>
                </form>

                <h1 className="topic">Game All </h1>
                <div className="All_game">
                    <Link to="/game1" className="card_game">Image Memory Test</Link>
                    <Link to="/game2" className="card_game">Game2</Link>
                </div>
            </div>
        </>
    );
}

export default GameHome;
