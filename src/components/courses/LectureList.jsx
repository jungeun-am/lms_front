'use client';

import React, { useEffect, useRef, useState } from "react";
import "@/app/(dashboard)/mycourses/mycourses.css";
import LectureList from "@/components/courses/LectureList";

const Enrollment = () => {
  const [courseList, setCourseList] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [cartList, setCartList] = useState([]);

  const ftypeRef = useRef(null);
  const fkeyRef = useRef(null);

  useEffect(() => {
    fetchLectureList();
    fetchEnrolledCourses();
    fetchCartList();
  }, []);

  const fetchLectureList = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/mycourses/enrollment/list");
      const data = await res.json();
      setCourseList(data);
    } catch (err) {
      console.error("강의 목록 오류:", err);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/mycourses/enrolledList?stdtId=20250001");
      const data = await res.json();
      setEnrolledCourses(data);
    } catch (err) {
      console.error("수강신청 내역 오류:", err);
    }
  };

  const fetchCartList = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/mycourses/cart/list?stdtId=20250001");
      const data = await res.json();
      setCartList(data);
    } catch (err) {
      console.error("장바구니 목록 오류:", err);
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

      const res = await fetch(url);
      const data = await res.json();
      setCourseList(data);
    } catch (err) {
      console.error("검색 오류:", err);
    }
  };

  const handleApply = async (course) => {
    const stdtId = 20250001;
    const lectureId = course.lectureId || course.lecture?.lectureId;

    if (!lectureId || enrolledCourses.some(c => c.lectureId === lectureId)) return;

    const data = {
      stdtId,
      lectureId,
      applyDate: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:8080/api/mycourses/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) fetchEnrolledCourses();
    } catch (err) {
      console.error("수강신청 오류:", err);
    }
  };

  const handleCancel = async (course) => {
    const stdtId = 20250001;
    const lectureId = course.lectureId;

    if (!window.confirm("정말 수강취소하시겠습니까?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/mycourses/remove?stdtId=${stdtId}&lectureId=${lectureId}`);
      if (res.ok) fetchEnrolledCourses();
    } catch (err) {
      console.error("수강취소 오류:", err);
    }
  };

  const handleBulkApply = async () => {
    const stdtId = 20250001;
    const sortedList = [...cartList].sort((a, b) => {
      const p1 = parseInt(a.priorityOrder ?? 9999, 10);
      const p2 = parseInt(b.priorityOrder ?? 9999, 10);
      return p1 - p2;
    });

    for (const course of sortedList) {
      const lectureId = course.lectureId || course.lecture?.lectureId;
      if (!lectureId || enrolledCourses.some(c => c.lectureId === lectureId)) continue;

      const data = {
        stdtId,
        lectureId,
        applyDate: new Date().toISOString(),
      };

      try {
        await fetch("http://localhost:8080/api/mycourses/enroll", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.error("일괄 신청 오류:", err);
      }
    }

    fetchEnrolledCourses();
  };

  const totalCredits = enrolledCourses.reduce((sum, course) => sum + (parseInt(course.credit) || 0), 0);

  const renderEnrolledRows = () => {
    if (enrolledCourses.length === 0) {
      return <tr><td colSpan="9">신청한 강좌가 없습니다.</td></tr>;
    }

    const sorted = [...enrolledCourses].sort((a, b) =>
      new Date(a.applyDate) - new Date(b.applyDate)
    );

    return sorted.map((course, index) => (
      <tr key={course.registerId}>
        <td>{index + 1}</td>
        <td>
          <button className="btn btn-sm btn-outline-danger" onClick={() => handleCancel(course)}>
            취소
          </button>
        </td>
        <td>{course.courseType}</td>
        <td>{course.department}</td>
        <td>{course.subjectCode}</td>
        <td>{course.subjectName}</td>
        <td>{course.subjectLevel}</td>
        <td>{course.credit}</td>
        <td>{course.timetable}</td>
      </tr>
    ));
  };

  return (
    <div className="enrollment-container mb-3">
      {/* 검색 */}
      <h5 className="fw-bold mb-0 border p-2 d-inline-block">검색</h5>
      <div className="search-box">
        <div className="search-box-row align-items-end">
          <div className="search-box-field">
            <label className="form-label mb-0" style={{ width: '80px' }}>검색조건</label>
            <select className="form-control" ref={ftypeRef} defaultValue="">
              <option value="">::선택::</option>
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
        <LectureList lectures={courseList} buttonLabel="신청" onClick={handleApply} />
      </div>

      {/* 장바구니 */}
      <div className="mb-4 mt-4">
        <h5 className="fw-bold mb-2 border p-2 d-inline-block">장바구니 강좌</h5>
        <button className="btn btn-primary mb-2" onClick={handleBulkApply}>일괄신청</button>
        <LectureList lectures={cartList} buttonLabel="신청" onClick={handleApply} />
      </div>

      {/* 신청내역 */}
      <div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h5 className="fw-bold mb-0 border p-2 d-inline-block">신청내역</h5>
          <div className="d-flex align-items-center gap-3">
            <span>신청 과목 수:</span>
            <div className="badge bg-primary">{enrolledCourses.length}</div>
            <span>총 학점:</span>
            <div className="badge bg-primary">{totalCredits}</div>
          </div>
        </div>
        <table className="table table-bordered text-center" style={{ tableLayout: "fixed", width: "100%" }}>
          <thead className="table-primary">
          <tr>
            <th>NO</th><th>수강취소</th><th>이수구분</th><th>개설전공학과</th>
            <th>교과목코드</th><th>교과목명</th><th>교과목 수준</th><th>학점</th><th>시간표</th>
          </tr>
          </thead>
          <tbody>{renderEnrolledRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Enrollment;
