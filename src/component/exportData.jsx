import  { useContext } from 'react';
import { UserGameContext } from '../dataUser';
import Swal from 'sweetalert2';
import './exportData.css';

const ExportData = () => {
  const { userData } = useContext(UserGameContext);

  // Format Game 1 data for display and export
  const formatGame1Data = (game1) => {
    if (!game1 || typeof game1 !== 'object') return [];
    return Object.values(game1).map(round => ({
      round: round.round,
      selectedImage: round.selectedImage,
      correctImage: round.correctImage,
      timeSpent: parseFloat(round.timeSpent).toFixed(2),
      result: round.result === 'ถูกต้อง' ? 'correct' : 'incorrect'
    }));
  };

  // Format Game 2 data for display and export
  const formatGame2Data = (game2) => {
    if (!game2 || typeof game2 !== 'object') return [];
    return Object.values(game2).map(round => ({
      round: round.round,
      score: round.score,
      incorrectSelections: round.incorrectSelections,
      timeTaken: round.timeTaken.toFixed(3),
      totalPossibleScore: round.totalPossibleScore
    }));
  };

  // Generate CSV content with properly formatted data
  const generateCSV = () => {
    const game1Data = formatGame1Data(userData.game1);
    const game2Data = formatGame2Data(userData.game2);
    const formGame1 = userData.formGame1 || {};
    const formGame2 = userData.formGame2 || {};

    // Create CSV header rows
    let csvContent = 'User Information\n';
    csvContent += `Username,${userData.userName}\n`;
    csvContent += `User ID,${userData.userId}\n\n`;

    // Game 1 Data
    csvContent += 'Game 1 Results\n';
    csvContent += 'Round,Selected Image,Correct Image,Time Spent (s),Result\n';
    game1Data.forEach(round => {
      csvContent += `${round.round},${round.selectedImage},${round.correctImage},${round.timeSpent},${round.result}\n`;
    });
    csvContent += '\n';

    // Game 2 Data
    csvContent += 'Game 2 Results\n';
    csvContent += 'Round,Score,Incorrect Selections,Time Taken (s),Total Possible Score\n';
    game2Data.forEach(round => {
      csvContent += `${round.round},${round.score},${round.incorrectSelections},${round.timeTaken},${round.totalPossibleScore}\n`;
    });
    csvContent += '\n';

    // Form Data
    csvContent += 'Game 1 Form Responses\n';
    csvContent += Object.entries(formGame1)
      .map(([key, value]) => `${key},${value}`)
      .join('\n');
    csvContent += '\n\nGame 2 Form Responses\n';
    csvContent += Object.entries(formGame2)
      .map(([key, value]) => `${key},${value}`)
      .join('\n');

    return csvContent;
  };

  const downloadCSV = () => {
    Swal.fire({
      title: 'ยืนยันการส่งออกข้อมูล',
      text: 'ต้องการดาวน์โหลดข้อมูลเป็นไฟล์ CSV หรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ดาวน์โหลด',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        const csvData = generateCSV();
        const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const fileName = `${userData.userName}_${userData.userId}_data.csv`;
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        Swal.fire('สำเร็จ!', 'ดาวน์โหลดข้อมูลเรียบร้อยแล้ว', 'success');
      }
    });
  };

  return (
    <div className="export-container">
      <h2 className="export-title">ข้อมูลผลการทดสอบ</h2>
      
      {/* User Information */}
      <div className="export-section">
        <h3 className="export-section__title">ข้อมูลผู้ใช้</h3>
        <div className="user-info">
          <div className="user-info__item">
            <span className="user-info__label">ชื่อผู้ใช้:</span>
            {userData.userName}
          </div>
          <div className="user-info__item">
            <span className="user-info__label">รหัสผู้ใช้:</span>
            {userData.userId}
          </div>
        </div>
      </div>

      {/* Game 1 Results */}
      <div className="export-section">
        <h3 className="export-section__title">ผลการทดสอบ Game 1</h3>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>รอบ</th>
                <th>ภาพที่เลือก</th>
                <th>ภาพที่ถูกต้อง</th>
                <th>เวลาที่ใช้ (วินาที)</th>
                <th>ผลลัพธ์</th>
              </tr>
            </thead>
            <tbody>
              {formatGame1Data(userData.game1).map((round) => (
                <tr key={round.round}>
                  <td>{round.round}</td>
                  <td>{round.selectedImage}</td>
                  <td>{round.correctImage}</td>
                  <td>{round.timeSpent}</td>
                  <td>
                    <span className={`result-badge result-badge--${round.result}`}>
                      {round.result === 'correct' ? 'ถูกต้อง' : 'ไม่ถูกต้อง'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Game 2 Results */}
      <div className="export-section">
        <h3 className="export-section__title">ผลการทดสอบ Game 2</h3>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>รอบ</th>
                <th>คะแนน</th>
                <th>การเลือกที่ผิด</th>
                <th>เวลาที่ใช้ (วินาที)</th>
                <th>คะแนนเต็ม</th>
              </tr>
            </thead>
            <tbody>
              {formatGame2Data(userData.game2).map((round) => (
                <tr key={round.round}>
                  <td>{round.round}</td>
                  <td>{round.score}</td>
                  <td>{round.incorrectSelections}</td>
                  <td>{round.timeTaken}</td>
                  <td>{round.totalPossibleScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Responses */}
      <div className="form-responses">
        <div className="form-response">
          <h3 className="export-section__title">แบบสอบถาม Game 1</h3>
          {userData.formGame1 && Object.entries(userData.formGame1).map(([key, value]) => (
            <div key={key} className="form-response__item">
              <span className="form-response__label">{key}:</span> {value}
            </div>
          ))}
        </div>
        <div className="form-response">
          <h3 className="export-section__title">แบบสอบถาม Game 2</h3>
          {userData.formGame2 && Object.entries(userData.formGame2).map(([key, value]) => (
            <div key={key} className="form-response__item">
              <span className="form-response__label">{key}:</span> {value}
            </div>
          ))}
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={downloadCSV}
        className="export-button"
      >
        ดาวน์โหลดข้อมูล CSV
      </button>
    </div>
  );
};

export default ExportData;