"use client";
import React, { useState } from "react";
import "@/app/(dashboard)/mycourses/OldCourses.css";

const OldCourses = () => {
  const courses = [
    { id: 1, courseName: "HOSEO Open CTL", instructors: "김경록, 정성욱, 서만석", enrolled: 30257 },
    { id: 2, courseName: "대학영어강독1", instructors: "배경진", enrolled: 36 },
    { id: 3, courseName: "글쓰기와커뮤니케이션", instructors: "김향", enrolled: 35 },
    { id: 4, courseName: "기초일본문어회화", instructors: "이영숙", enrolled: 60 },
    { id: 5, courseName: "사회봉사이해", instructors: "안존희, 소재림", enrolled: 227 },
    { id: 6, courseName: "벤처와창업가정신", instructors: "김연정", enrolled: 36 },
    { id: 7, courseName: "컴퓨터통계사고", instructors: "강홍순", enrolled: 72 },
    { id: 8, courseName: "채플", instructors: "장하훈", enrolled: 240 },
    { id: 9, courseName: "디지털기술의이해", instructors: "박기호", enrolled: 6 },
  ];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const paginatedCourses = courses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="old-courses-container">
      <h1>구 수강 과목</h1>
      <p>과거 수강한 강좌 리스트입니다.</p>
      <table className="courses-table">
        <thead>
        <tr>
          <th>번호</th>
          <th>강좌명</th>
          <th>담당교수</th>
          <th>수강인원</th>
        </tr>
        </thead>
        <tbody>
        {paginatedCourses.map((course) => (
          <tr key={course.id}>
            <td>{course.id}</td>
            <td>{course.courseName}</td>
            <td>{course.instructors}</td>
            <td>{course.enrolled}</td>
          </tr>
        ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OldCourses;
