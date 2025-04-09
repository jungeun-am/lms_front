'use client';

import React from 'react';
import '@/app/(dashboard)/mypage/mypage.css';

const TotalScore = () => {
  const subjects = [
    {
      year: '2019학년도',
      semester: '1학기',
      code: '006005',
      name: '기본영어',
      type: '기초',
      major: ''
    },
    // 나머지 과목들 추가
  ];

  const summaryByTerm = [
    {
      year: '2019학년도',
      semester: '1학기',
      applied: 15,
      earned: 15,
      retaken: 2,
      gpa: 2.96429,
      score: 41.5,
      percentage: 83.64,
      scholarship: '39/47'
    },
    // 나머지 학기 요약 추가
  ];

  return (
    <div className="container py-4">
      <h4 className="grades-title">전체 성적 조회</h4>

      {/* 성적 목록 */}
      <section className="grades-section">
        <h5>성적 목록</h5>
        <div className="table-responsive">
          <table className="grades-table">
            <thead>
            <tr>
              <th>No</th>
              <th>학년도</th>
              <th>학기</th>
              <th>교과목코드</th>
              <th>교과목명</th>
              <th>이수구분</th>
              <th>전공학과</th>
            </tr>
            </thead>
            <tbody>
            {subjects.map((subject, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{subject.year}</td>
                <td>{subject.semester}</td>
                <td>{subject.code}</td>
                <td>{subject.name}</td>
                <td>{subject.type}</td>
                <td>{subject.major}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 학기별 집계 성적 */}
      <section className="grades-section">
        <h5>학년도, 학기별 집계 성적</h5>
        <div className="table-responsive">
          <table className="grades-table">
            <thead>
            <tr>
              <th>No</th>
              <th>학년도</th>
              <th>학기</th>
              <th>신청학점</th>
              <th>이수학점</th>
              <th>학기평균</th>
              <th>학기평점</th>
              <th>학년평균등급</th>
            </tr>
            </thead>
            <tbody>
            {summaryByTerm.map((term, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{term.year}</td>
                <td>{term.semester}</td>
                <td>{term.applied}</td>
                <td>{term.earned}</td>
                <td>{term.percentage}</td>
                <td>{term.gpa}</td>
                <td>{term.score}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 grades-table text-muted">
          * 성적평점은 전체 학점 이수 기준이며, 보충과목은 재이수 과목 포함 여부에 따라 다름<br />
          * 전체석차는 동일 학년 전체 학생 대비 석차임 (학적변동에 따라 변동될 수 있음)
        </p>
      </section>
    </div>
  );
};

export default TotalScore;
