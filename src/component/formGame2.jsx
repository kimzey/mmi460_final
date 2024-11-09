import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate สำหรับการเปลี่ยนหน้า
import styles from './formGame1.module.css';
import { UserGameContext } from '../dataUser';
import Swal from 'sweetalert2';

const SurveyForm = () => {
  const { userData, updateGameData } = useContext(UserGameContext);

  const navigate = useNavigate(); // ประกาศ navigate
  const [formData, setFormData] = useState({
    difficulty: '',
    memoryTechnique: '',
    colorImportance: '',
    colorDistinction: '',
    positionImportance: '',
    positionDistinction: '',
    otherDetails: '',
  });

  useEffect(() => {
    // เมื่อ formData เปลี่ยนแปลง ให้เรียก updateGameData
    if (Object.keys(formData).length > 0) {
      updateGameData("formGame2", formData);
      console.log(userData); // ตรวจสอบข้อมูลที่ส่งไป
    }
  }, [formData, updateGameData, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    updateGameData("formGame2",formData)
    console.log(userData);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'ยืนยันการส่งคำตอบ?',
      text: "คุณต้องการส่งคำตอบนี้หรือไม่?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ส่งคำตอบ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Submitted Data:", formData);
        navigate("/"); // กลับไปหน้า Home หลังจากกดส่งคำตอบ
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>แบบสอบถาม</h2>

      {/* ระดับความยาก */}
      <label className={styles.label}>
        คุณรู้สึกว่าการทำแบบทดสอบนี้ยากหรือง่ายแค่ไหน? (เลือกจากระดับ 1 - 5)
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className={styles.select}
          required
        >
          <option value="">เลือก...</option>
          {[1, 2, 3, 4, 5].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>

      {/* วิธีการที่ใช้ในการจดจำ */}
      <label className={styles.label}>
        วิธีที่คุณใช้ในการจดจำ
        <input
          type="text"
          name="memoryTechnique"
          value={formData.memoryTechnique}
          onChange={handleChange}
          className={styles.textInput}
        />
      </label>

      {/* การจดจำสี */}
      <label className={styles.label}>
        คุณรู้สึกว่าการจดจำสีมีบทบาทสำคัญแค่ไหน? (ระดับ 1 - 5)
        <select
          name="colorImportance"
          value={formData.colorImportance}
          onChange={handleChange}
          className={styles.select}
          required
        >
          <option value="">เลือก...</option>
          {[1, 2, 3, 4, 5].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>

      {/* การแยกแยะสี */}
      <label className={styles.label}>
        คุณพบว่าการแยกแยะสีภายในภาพทำให้การจดจำภาพง่ายขึ้นหรือไม่? (ใช่ หรือ ไม่)
        <select
          name="colorDistinction"
          value={formData.colorDistinction}
          onChange={handleChange}
          className={styles.select}
          required
        >
          <option value="">เลือก...</option>
          <option value="yes">ใช่</option>
          <option value="no">ไม่</option>
        </select>
      </label>

      {/* การจดจำตำแหน่ง */}
      <label className={styles.label}>
        คุณรู้สึกว่าการจดจำตำแหน่งมีบทบาทสำคัญแค่ไหน? (ระดับ 1 - 5)
        <select
          name="positionImportance"
          value={formData.positionImportance}
          onChange={handleChange}
          className={styles.select}
          required
        >
          <option value="">เลือก...</option>
          {[1, 2, 3, 4, 5].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>

      {/* การแยกแยะตำแหน่ง */}
      <label className={styles.label}>
        คุณพบว่าการแยกแยะตำแหน่งภายในภาพทำให้การจดจำภาพง่ายขึ้นหรือไม่? (ใช่ หรือ ไม่)
        <select
          name="positionDistinction"
          value={formData.positionDistinction}
          onChange={handleChange}
          className={styles.select}
          required
        >
          <option value="">เลือก...</option>
          <option value="yes">ใช่</option>
          <option value="no">ไม่</option>
        </select>
      </label>

      {/* รายละเอียดอื่น ๆ */}
      <label className={styles.label}>
        การจดจำรายละเอียดอื่น ๆ (ถ้ามี)
        <input
          type="text"
          name="otherDetails"
          value={formData.otherDetails}
          onChange={handleChange}
          className={styles.textInput}
        />
      </label>

      <button type="submit" className={styles.submitButton}>ส่งคำตอบ</button>
    </form>
  );
};

export default SurveyForm;
