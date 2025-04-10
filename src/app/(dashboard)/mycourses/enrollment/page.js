'use client';
import React, { useEffect, useRef, useState } from "react";
import "@/app/(dashboard)/mycourses/mycourses.css";

const Enrollment = () => {
  const [courseList, setCourseList] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const ftypeRef = useRef(null);
  const fkeyRef = useRef(null);

  useEffect(() => {
    fetchLectureList();
  }, []);

  const fetchLectureList = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/mycourses/enrollment/list", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("서버 응답 실패");
      const data = await response.json();
      setCourseList(data);
    } catch (error) {
      console.error("강의 목록 불러오기 실패:", error);
    }
  };

  const goLectureFind = async () => {
    const findtype = ftypeRef.current.value;
    const findkey = fkeyRef.current.value;

    if (!findtype) {
      alert("검색조건을 선택해주세요.");
      return;
    }

    try {
      const url = findkey
        ? `http://localhost:8080/api/mycourses/find/${findtype}/${findkey}`
        : `http://localhost:8080/api/mycourses/find/${findtype}`;

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("서버 응답 실패");
      const data = await response.json();
      setCourseList(data);
    } catch (error) {
      console.error("강의 목록 불러오기 실패:", error);
    }
  };

  const renderCourseRows = () => {
    if (!Array.isArray(courseList) || courseList.length === 0) {
      return <tr><td colSpan="9" className="text-muted">개설된 강좌가 없습니다!</td></tr>;
    }
    return courseList.map((course, index) => (
      <tr key={course.lecture_id}>
        <td>{index + 1}</td>
        <td>
          <button className="btn btn-sm btn-outline-primary">신청</button>
        </td>
        <td>{course.course_type}</td>
        <td>{course.department}</td>
        <td>{course.subject_code}</td>
        <td>{course.subject_name}</td>
        <td>{course.subject_level}</td>
        <td>{course.credit}</td>
        <td>{course.timetable}</td>
      </tr>
    ));
  };

  return (
    <div className="enrollment-container mb-3">
      <h5 className="fw-bold mb-0 border p-2 d-inline-block">검색</h5>
      <div className="search-box">
        <div className="search-box-row align-items-end">
          <div className="search-box-field">
            <label className="form-label mb-0" style={{ width: '80px' }}>검색조건</label>
            <select className="form-control" ref={ftypeRef} defaultValue="">
              <option value="">전체</option>
              <option value="courseType">이수구분</option>
              <option value="department">개설전공학과</option>
              <option value="subjectCode">교과목코드</option>
              <option value="subjectName">교과목명</option>
            </select>
          </div>
          <div className="search-box-field d-flex align-items-center gap-2" style={{ flexGrow: 1 }}>
            <label className="form-label mb-0" style={{ width: '80px' }}>검색어</label>
            <input type="text" className="form-control" ref={fkeyRef} />
            <button className="btn btn-primary" onClick={goLectureFind}>검색</button>
          </div>
        </div>
      </div>

      {/* 개설강좌 */}
      <div className="mb-4 mt-4">
        <h5 className="fw-bold mb-2 border p-2 d-inline-block">개설강좌 목록</h5>
        <table className="table table-bordered text-center" style={{ tableLayout: "fixed", width: "100%" }}>
          <thead className="table-primary">
          <tr>
            <th>NO</th><th>신청</th><th>이수구분</th><th>개설전공학과</th><th>교과목코드</th><th>교과목명</th><th>교과목 수준</th><th>학점</th><th>시간표</th>
          </tr>
          </thead>
          <tbody>
          {renderCourseRows()}
          </tbody>
        </table>
      </div>


      {/* 신청내역 */}
      <div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h5 className="fw-bold mb-0 border p-2 d-inline-block">신청내역</h5>
          <div className="d-flex align-items-center gap-3">
            <span style={{ fontSize: "1rem" }}>신청 과목 수:</span>
            <div className="bg-primary text-white text-center" style={{ width: "18px", height: "18px", fontSize: "0.75rem", lineHeight: "18px", borderRadius: "2px", color: "white" }}>
              {enrolledCourses.length}
            </div>
            <span style={{ fontSize: "0.9rem" }}>총 학점:</span>
            <div className="bg-primary text-white text-center" style={{ width: "28px", height: "18px", fontSize: "0.75rem", lineHeight: "18px", borderRadius: "2px", color: "white"  }}>
              {
                //totalCredits
              }
            </div>
          </div>
        </div>
        <table className="table table-bordered text-center" style={{ tableLayout: "fixed", width: "100%" }}>
          <thead className="table-primary">
          <tr>
            <th>NO</th><th>수강취소</th><th>이수구분</th><th>개설전공학과</th><th>교과목코드</th><th>교과목명</th><th>교과목 수준</th><th>학점</th><th>시간표</th>
          </tr>
          </thead>
          <tbody>{
            //renderEnrolledRows()
            }</tbody>
        </table>
      </div>
    </div>
  );
};

export default Enrollment;
