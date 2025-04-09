"use client";
import React, { useState } from "react";
import Link from "next/link";
import "@/app/(dashboard)/board/notices/Notices.css";

const Notices = () => {
  const notices = [
    {
      id: "1",
      title: "LMS 서비스 중단 안내",
      content: "LMS 서비스가 잠시 중단됩니다. 시스템 점검이 완료되면 다시 안내드리겠습니다.",
      author: "관리자",
      createdAt: "2025-04-03 10:30",
    },
    {
      id: "2",
      title: "신입생 학번으로 로그인 하시기 바랍니다.",
      content: "신입생은 학번으로 로그인 해주세요. 정확한 로그인 방법은 아래 안내를 참고하세요.",
      author: "입학처",
      createdAt: "2025-04-02 17:10",
    },
    {
      id: "3",
      title: "교수자 전자출결 시스템 연동 문의 안내",
      content: "교수자 분들의 전자출결 시스템 연동 관련 문의를 안내드립니다.",
      author: "학사팀",
      createdAt: "2025-04-01 14:00",
    },
    {
      id: "4",
      title: "LMS 및 전자출결 시스템 문의에 대한 안내",
      content: "LMS 및 전자출결 시스템에 대한 문의 방법 안내입니다.",
      author: "학사팀",
      createdAt: "2025-03-31 09:30",
    },
  ];

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(notices.length / itemsPerPage);

  const paginatedNotices = notices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="notices-container">
      <h1>공지사항</h1>

      <table className="notices-table">
        <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일시</th>
        </tr>
        </thead>
        <tbody>
        {paginatedNotices.map((notice) => (
          <tr key={notice.id}>
            <td>{notice.id}</td>
            <td>
              <Link href={`/board/notices/${notice.id}`} className="notice-title">
                {notice.title}
              </Link>
            </td>
            <td>{notice.author}</td>
            <td>{notice.createdAt}</td>
          </tr>
        ))}
        </tbody>
      </table>

      {/* 페이징 */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Notices;
