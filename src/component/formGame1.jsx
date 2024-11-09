import { useContext, useEffect, useState } from "react";
import styles from "./formGame1.module.css";
import { useNavigate } from "react-router-dom"; // import useNavigate
import { UserGameContext } from '../dataUser';
import Swal from 'sweetalert2'; // import SweetAlert2

const SurveyForm = () => {
  const navigate = useNavigate(); // เรียกใช้ useNavigate
  const { userData, updateGameData } = useContext(UserGameContext);

  const [formData, setFormData] = useState({
    difficulty: "",
    memoryTechnique: "",
    colorImportance: "",
    shapeImportance: "",
    positionImportance: "",
    colorDistinction: "",
    shapeDistinction: "",
    positionDistinction: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    updateGameData("formGame1", formData);
    console.log(userData);
  };

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      updateGameData("formGame1", formData);
      console.log(userData); // ตรวจสอบข้อมูลที่ส่งไป
    }
  }, [formData, updateGameData, userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show SweetAlert2 confirmation before submitting
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

      <label className={styles.label}>
        คุณรู้สึกว่าการทำแบบทดสอบนี้ยากหรือง่ายแค่ไหน? (ระดับ 1 - 5)
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

      <label className={styles.label}>
        คุณรู้สึกว่า “การจดจำสี” มีบทบาทสำคัญแค่ไหน? (ระดับ 1 - 5)
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

      <label className={styles.label}>
        คุณรู้สึกว่า “การจดจำองค์ประกอบหรือรูปทรง” มีบทบาทสำคัญแค่ไหน? (ระดับ 1 - 5)
        <select
          name="shapeImportance"
          value={formData.shapeImportance}
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

      <label className={styles.label}>
        คุณรู้สึกว่า “การจดจำตำแหน่งของภาพ” มีบทบาทสำคัญแค่ไหน? (ระดับ 1 - 5)
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

      <label className={styles.label}>
        คุณพบว่า “การแยกแยะสี” ภายในภาพทำให้การจดจำภาพง่ายขึ้นหรือไม่? (ใช่ หรือ
        ไม่)
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

      <label className={styles.label}>
        คุณพบว่า “การแยกแยะองค์ประกอบหรือรูปทรง” ภายในภาพทำให้การจดจำภาพง่ายขึ้นหรือไม่? (ใช่ หรือ ไม่)
        <select
          name="shapeDistinction"
          value={formData.shapeDistinction}
          onChange={handleChange}
          className={styles.select}
          required
        >
          <option value="">เลือก...</option>
          <option value="yes">ใช่</option>
          <option value="no">ไม่</option>
        </select>
      </label>

      <label className={styles.label}>
        คุณพบว่า “การแยกแยะตำแหน่ง” ภายในภาพทำให้การจดจำภาพง่ายขึ้นหรือไม่? (ใช่
        หรือ ไม่)
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

      <button type="submit" className={styles.submitButton}>
        ส่งคำตอบ
      </button>
    </form>
  );
};

export default SurveyForm;
