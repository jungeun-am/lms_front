'use client';
import React, { useEffect, useRef, useState } from "react";
import "@/app/(dashboard)/mycourses/mycourses.css";
import LectureList from "@/components/courses/LectureList";

const Enrollment = () => {
  const [courseList, setCourseList] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const ftypeRef = useRef(null);
  const fkeyRef = useRef(null);

  useEffect(() => {
    fetchLectureList();
    fetchEnrolledCourses();
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

  const handleApply = async (course) => {
    const stdtId = 20250001;
    const applyDate = new Date().toISOString().slice(0, 10);

    console.log("course:", course);
    console.log("lecture:", course.lectureId);

    const data = {
      stdtId: 20250001,
      lectureId: course.lectureId,
      applyDate: "2025-04-10T15:55:50",
    };

    console.log("data:", data);

    fetch('http://localhost:8080/api/mycourses/enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(async response => {
      if (response.ok) {
        console.log('response',response);
        alert('글쓰기가 완료되었습니다!!');
        location.href = '';
      } else if (response.status === 400) {
        alert(await response.text());
      } else {
        alert('게시판 글쓰기에 실패했습니다!! 다시 시도해 주세요!');
      }
    }).catch(error => {
      console.error('error:', error);
      alert('서버와 통신중 오류가 발생했습니다!! 관리자에게 문의하세요!');
    });

    //   alert("수강 신청 완료!");
    //   setEnrolledCourses((prev) => [...prev, course]);
    // } catch (error) {
    //   console.error("신청 실패:", error);
    //   alert("신청 중 오류 발생");
    // }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/mycourses/enrolledList?stdtId=20250001");
      if (!res.ok) throw new Error("수강신청 내역 요청 실패");
      const data = await res.json();
      setEnrolledCourses(data);
    } catch (err) {
      console.error("수강신청 내역 불러오기 실패:", err);
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
          <button className="btn btn-sm btn-outline-primary" onClick={() => handleApply(course)}>신청</button>
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

  const handleCancel = async (course) => {
    const stdtId = 20250001;
    const lectureId = course.lectureId?.lectureId; // ← 이 줄!

    console.log("🔍 취소 요청:", {stdtId, lectureId});

    if (!window.confirm("정말 수강취소하시겠습니까?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/mycourses/remove?stdtId=${stdtId}&lectureId=${lectureId}`, {
        method: "GET"
      });

      if (res.ok) {
        alert("수강취소 완료!");
        fetchEnrolledCourses();
      } else {
        const msg = await res.text();
        alert("수강취소 실패: " + msg);
      }
    } catch (err) {
      console.error("❌ 수강취소 중 오류 발생", err);
      alert("수강취소 중 오류 발생");
    }
  };
  const renderEnrolledRows = () => {
    if (enrolledCourses.length === 0) {
      return <tr><td colSpan="9" className="text-muted">신청한 강좌가 없습니다.</td></tr>;
    }
    return enrolledCourses.map((course, index) => (
      <tr key={course.lectureId}>
        <td>{index + 1}</td>
        {/*<td><button className="btn btn-sm btn-outline-danger"*/}
        {/*            onClick={() => handleCancel(course.lectureId)} >취소</button></td>*/}
        <td>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              console.log("🔍 취소 클릭: course 객체", course);
              console.log("lectureId 확인:", course.lectureId || course.lectureId);
              handleCancel(course);
            }}
          >
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

  const totalCredits = enrolledCourses.reduce((sum, course) => sum + (parseInt(course.credit) || 0), 0);

  return (
    <div className="enrollment-container mb-3">
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
        <LectureList
          lectures={courseList}
          buttonLabel="신청"
          onClick={handleApply}
        />
      </div>

      {/* 신청내역 */}
      <div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h5 className="fw-bold mb-0 border p-2 d-inline-block">신청내역</h5>
          <div className="d-flex align-items-center gap-3">
            <span style={{ fontSize: "1rem" }}>신청 과목 수:</span>
            <div className="bg-primary text-white text-center" style={{ width: "18px", height: "18px", fontSize: "0.75rem", lineHeight: "18px", borderRadius: "2px" }}>
              {enrolledCourses.length}
            </div>
            <span style={{ fontSize: "0.9rem" }}>총 학점:</span>
            <div className="bg-primary text-white text-center" style={{ width: "28px", height: "18px", fontSize: "0.75rem", lineHeight: "18px", borderRadius: "2px" }}>
              {totalCredits}
            </div>
          </div>
        </div>
        <table className="table table-bordered text-center" style={{ tableLayout: "fixed", width: "100%" }}>
          <thead className="table-primary">
          <tr>
            <th>NO</th><th>수강취소</th><th>이수구분</th><th>개설전공학과</th><th>교과목코드</th><th>교과목명</th><th>교과목 수준</th><th>학점</th><th>시간표</th>
          </tr>
          </thead>
          <tbody>
          {renderEnrolledRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Enrollment;
