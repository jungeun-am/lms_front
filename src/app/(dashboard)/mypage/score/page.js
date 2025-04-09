'use client';

import React from 'react';
import '@/app/(dashboard)/mypage/mypage.css';

const Score = () => {


    const studentInfo = {
      name: '임정은',
      studentId: '20190427',
      department: '국제통상학과'
    };

    const grades = [
      // 예시: { code: '001001', name: '데이터베이스', type: '전공', grade: 'A', score: 93, credit: 3 }
    ];

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
          {grades.length === 0 ? (
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
export default Score;
