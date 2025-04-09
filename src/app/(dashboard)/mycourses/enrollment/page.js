'use client'

import React, { useEffect, useState } from "react";
import "@/app/(dashboard)/mycourses/mycourses.css";

const Enrollment = () => {
  const [courseList, setCourseList] = useState([]);
  const [cartCourses, setCartCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [checkedCartCourseIds, setCheckedCartCourseIds] = useState([]);
  const [level, setLevel] = useState("");
  const [professor, setProfessor] = useState("");

  useEffect(() => {
    const fetchLectureList = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/mycourses/enrollment/list", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("서버 응답 실패");
        const data = await response.json();
        setCourseList(data);
      } catch (error) {
        console.error("강의 목록 불러오기 실패:", error);
      }
    };
    fetchLectureList();
  }, []);

  const toggleEnrollment = (course) => {
    if (!enrolledCourses.find((c) => c.lecture_id === course.lecture_id)) {
      setEnrolledCourses([...enrolledCourses, course]);
    }
  };

  const handleCartCheckboxToggle = (courseId) => {
    if (checkedCartCourseIds.includes(courseId)) {
      setCheckedCartCourseIds(checkedCartCourseIds.filter((id) => id !== courseId));
    } else {
      setCheckedCartCourseIds([...checkedCartCourseIds, courseId]);
    }
  };

  const handleSelectAllCart = () => {
    const allIds = cartCourses.map((c) => c.lecture_id);
    setCheckedCartCourseIds(allIds);
  };

  const handleApplyCheckedCourses = () => {
    const selectedCourses = cartCourses.filter(
      (course) =>
        checkedCartCourseIds.includes(course.lecture_id) &&
        !enrolledCourses.find((e) => e.lecture_id === course.lecture_id)
    );
    setEnrolledCourses([...enrolledCourses, ...selectedCourses]);
    setCheckedCartCourseIds([]);
  };

  const filteredCourses = courseList.filter(
    (course) =>
      (level === "" || course.subject_level === level) &&
      (professor === "" || course.department.includes(professor))
  );

  const totalCredits = enrolledCourses.reduce((sum, course) => sum + parseInt(course.credit), 0);

  const renderCourseRows = () => {
    if (!Array.isArray(filteredCourses) || filteredCourses.length === 0) {
      return <tr><td colSpan="9" className="text-muted">개설된 강좌가 없습니다!</td></tr>;
    }
    return filteredCourses.map((course, index) => (
      <tr key={course.lecture_id}>
        <td>{index + 1}</td><td>
        <button className="btn btn-sm btn-outline-primary"
                onClick={() => toggleEnrollment(course)}

                disabled={cartCourses.some((c) => c.lecture_id === course.lecture_id)}>
          신청
        </button>
      </td><td>{course.course_type}</td><td>{course.department}</td><td>{course.subject_code}</td>
        <td>{course.subject_name}</td><td>{course.subject_level}</td><td>{course.credit}</td><td>{course.timetable}</td>
      </tr>
    ));
  };

  const renderCartRows = () => {
    if (cartCourses.length === 0) {
      return <tr><td colSpan="9" className="text-muted">담긴 과목이 없습니다.</td></tr>;
    }
    return cartCourses.map((course, index) => (
      <tr key={course.lecture_id}>
        <td>{index + 1}</td>
        <td>
          <input type="checkbox"
                 checked={checkedCartCourseIds.includes(course.lecture_id)}
                 onChange={() => handleCartCheckboxToggle(course.lecture_id)} />
        </td>
        <td>
          <button className="btn btn-sm btn-outline-primary"
                  onClick={() => toggleEnrollment(course)}
                  disabled={enrolledCourses.some((c) => c.lecture_id === course.lecture_id)}>
            신청
          </button>
        </td>
        <td>{course.course_type}</td><td>{course.subject_code}</td><td>{course.subject_name}</td>
        <td>{course.credit}</td><td>{course.department}</td><td>{course.timetable}</td>
      </tr>
    ));
  };

  const renderEnrolledRows = () => {
    if (enrolledCourses.length === 0) {
      return <tr><td colSpan="9" className="text-muted">신청된 과목이 없습니다.</td></tr>;
    }
    return enrolledCourses.map((course, index) => (
      <tr key={course.lecture_id}>
        <td>{index + 1}</td>
        <td>
          <button className="btn btn-sm btn-outline-danger"
                  onClick={() => setEnrolledCourses(enrolledCourses.filter((c) => c.lecture_id !== course.lecture_id))}>
            삭제
          </button>
        </td>
        <td>{course.course_type}</td><td>{course.department}</td><td>{course.subject_code}</td>
        <td>{course.subject_name}</td><td>{course.subject_level}</td><td>{course.credit}</td><td>{course.timetable}</td>
      </tr>
    ));
  };

  return (
    <div className="enrollment-container mb-3">
      <h5 className="fw-bold mb-0 border p-2 d-inline-block">검색</h5>
      <div className="search-box">
        <div className="search-box-row align-items-end">
          <div className="search-box-field">
            <label className="form-label mb-0" style={{ width: '80px' }}>수준</label>
            <select className="form-control" value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="">전체</option>
              <option value="학부">학부</option>
            </select>
          </div>
          <div className="search-box-field" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexGrow: 1 }}>
            <label className="form-label mb-0" style={{ width: '80px' }}>학과</label>
            <input
              type="text"
              className="form-control"
              style={{ flexGrow: 1 }}
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
            />
            <button className="btn btn-primary">조회</button>
          </div>
        </div>
      </div>

      {/* 장바구니 */}
      <div className="d-flex align-items-center justify-content-between mb-2 mt-4">
        <h5 className="fw-bold mb-0 border p-2 d-inline-block">장바구니</h5>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary custom-btn" onClick={handleSelectAllCart}>일괄선택</button>
          <button className="btn btn-outline-primary custom-btn" onClick={handleApplyCheckedCourses}>신청하기</button>
        </div>
      </div>
      <table className="table table-bordered text-center" style={{ tableLayout: 'fixed', width: '100%' }}>
        <thead className="table-primary">
        <tr>
          <th>NO</th><th>선택</th><th>신청</th><th>이수구분</th><th>교과목코드</th><th>교과목명</th><th>학점</th><th>담당학과</th><th>시간표</th>
        </tr>
        </thead>
        <tbody>{renderCartRows()}</tbody>
      </table>

      {/* 개설강좌 */}
      <div className="mb-4">
        <h5 className="fw-bold mb-2 border p-2 d-inline-block">개설강좌 목록</h5>
        <table className="table table-bordered text-center" style={{ tableLayout: 'fixed', width: '100%' }}>
          <thead className="table-primary">
          <tr>
            <th>NO</th><th>신청</th><th>이수구분</th><th>개설전공학과</th><th>교과목코드</th><th>교과목명</th><th>교과목 수준</th><th>학점</th><th>시간표</th>
          </tr>
          </thead>

          <tbody>{renderCourseRows()}</tbody>
        </table>

      </div>

      {/* 신청내역 */}
      <div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h5 className="fw-bold mb-0 border p-2 d-inline-block">신청내역</h5>
          <div className="d-flex align-items-center gap-3">
            <span style={{ fontSize: '1' }}>신청 과목 수:</span>
            <div className="bg-primary text-white text-center" style={{ width: '18px', height: '18px', fontSize: '0.75rem', lineHeight: '18px', borderRadius: '2px' }}>
              {enrolledCourses.length}
            </div>
            <span style={{ fontSize: '0.9rem' }}>총 학점:</span>
            <div className="bg-primary text-white text-center" style={{ width: '28px', height: '18px', fontSize: '0.75rem', lineHeight: '18px', borderRadius: '2px' }}>
              {totalCredits}
            </div>
          </div>
        </div>
        <table className="table table-bordered text-center" style={{ tableLayout: 'fixed', width: '100%' }}>
          <thead className="table-primary">
          <tr>
            <th>NO</th><th>수강취소</th><th>이수구분</th><th>개설전공학과</th><th>교과목코드</th><th>교과목명</th><th>교과목 수준</th><th>학점</th><th>시간표</th>
          </tr>
          </thead>
          <tbody>{renderEnrolledRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Enrollment;
