"use client";
import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import "@/app/(dashboard)/mycourses/Submit.css";

const SubmitAssignment = ({ params }) => {
  const { id } = params; // ← 주차 ID 받아오기

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      setStatus("제출됨");
      alert(`${id}주차 과제가 제출되었습니다.`);
    } else {
      setStatus("제출되지 않음");
      alert("파일을 선택해주세요.");
    }
  };

  return (
    <div className="submit-assignment-container">
      <h1>{id}주차 과제 제출</h1>

      <div className="assignment-info">
        <h2>제출 상세</h2>
        <table>
          <tbody>
          <tr>
            <td>제출 여부</td>
            <td>{status || "제출되지 않음"}</td>
          </tr>
          <tr>
            <td>채점 상태</td>
            <td>채점되지 않음</td>
          </tr>
          <tr>
            <td>종료 일시</td>
            <td>2025-04-06 00:00</td>
          </tr>
          <tr>
            <td>마감까지 남은 기한</td>
            <td>2일 11시간</td>
          </tr>
          <tr>
            <td>최초 등록 일시</td>
            <td>2025-04-02 21:31</td>
          </tr>
          </tbody>
        </table>
        <p>제출할 파일을 선택하세요.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="file-input">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx,.pptx,.jpg,.png"
          />
        </div>
        <button type="submit" className="submit-btn">
          <FaFileUpload /> 과제 제출하기
        </button>
      </form>
    </div>
  );
};

export default SubmitAssignment;
