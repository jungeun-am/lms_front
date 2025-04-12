'use client';

import React, {useEffect, useState} from 'react';
import '@/app/(dashboard)/mypage/mypage.css';

const TotalScore = () => {

  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState({ name: '', studentId: '', department: '' });

  useEffect(() => {
    const stdtId = 20250001;
    const courseYear = '2025';
    const semesterCd = 10;

    const fetchGrades = async () => {
      try {
        const res = await fetch(
          `/api/mypage/totalScore?stdtId=${stdtId}&courseYear=${courseYear}&semesterCd=${semesterCd}`
        );
        if (!res.ok) throw new Error("성적 조회 실패");
        const result = await res.json();

        const formatted = result.grades.map((g) => ({
          code: g.subjectCode,
          name: g.subjectName,
          type: g.courseType,
          grade: g.termAvgGrade,
          score: g.termAvgScore,
          credit: g.creditEarned
        }));

        setGrades(formatted);
        setStudentInfo(result.student);
      } catch (err) {
        console.error("❌ 성적 조회 오류:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  return (
    <div className="container py-4">
      <h5 className="midterm-title">중간성적 조회</h5>

      <table className="midterm-info-table">
        <tbody>
        <tr>
          <td className="label">이름</td>
          <td>{studentInfo.name}</td>
        </tr>
        <tr>
          <td className="label">학번</td>
          <td>{studentInfo.studentId}</td>
        </tr>
        <tr>
          <td className="label">학과</td>
          <td>{studentInfo.department}</td>
        </tr>
        </tbody>
      </table>

      <table className="midterm-grades-table">
        <thead>
        <tr>
          <th>NO</th>
          <th>교과목코드</th>
          <th>교과목명</th>
          <th>이수구분</th>
          <th>등급</th>
          <th>점수</th>
          <th>이수학점</th>
        </tr>
        </thead>
        <tbody>
        {loading ? (
          <tr><td colSpan="7" className="text-center">조회 중...</td></tr>
        ) : grades.length === 0 ? (
          <tr>
            <td colSpan="7" className="text-center">성적 정보가 없습니다.</td>
          </tr>
        ) : (
          grades.map((grade, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{grade.code}</td>
              <td>{grade.name}</td>
              <td>{grade.type}</td>
              <td>{grade.grade}</td>
              <td>{grade.score}</td>
              <td>{grade.credit}</td>
            </tr>
          ))
        )}
        </tbody>
      </table>
    </div>
  );
};

export default TotalScore;
