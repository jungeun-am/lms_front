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

  // ✅ 콘솔 확인용
  useEffect(() => {
    console.log("✅ cartList:", cartList);
  }, [cartList]);

  useEffect(() => {
    console.log("✅ enrolledCourses:", enrolledCourses);
  }, [enrolledCourses]);

  useEffect(() => {
    console.log("✅ cartList 우선순위:", cartList.map(c => c.priorityOrder));
  }, [cartList]);

  useEffect(() => {
    fetchLectureList();
    fetchEnrolledCourses();
    fetchCartList();
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

  const fetchCartList = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/mycourses/cart?stdtId=20250001");
      console.log("📡 장바구니 응답 상태:", res.status);  // 이거 추가!
      if (!res.ok) throw new Error("장바구니 목록 요청 실패");
      const data = await res.json();
      console.log("📦 장바구니 응답 데이터:", data);  // 이거도 추가!
      setCartList(data);
    } catch (err) {
      console.error("장바구니 목록 불러오기 실패:", err);
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
    const lectureId = course.lectureId || course.lecture?.lectureId;

    if (!lectureId) {
      alert("강의 ID를 찾을 수 없습니다.");
      return;
    }

    if (enrolledCourses.some(c => c.lectureId === lectureId)) {
      alert("이미 신청된 강의입니다.");
      return;
    }

    const data = {
      stdtId,
      lectureId,
      applyDate: new Date().toISOString(), // <-- 수정됨
    };

    try {
      const response = await fetch("http://localhost:8080/api/mycourses/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("수강신청이 완료되었습니다!!");
        fetchEnrolledCourses();
      } else if (response.status === 400) {
        alert(await response.text());
      } else {
        alert("수강신청에 실패했습니다!! 다시 시도해 주세요!");
      }
    } catch (error) {
      console.error("❌ 수강신청 오류:", error);
      alert("서버와 통신 중 오류가 발생했습니다!! 관리자에게 문의하세요!");
    }
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

  const handleCancel = async (course) => {
    const stdtId = 20250001;
    const lectureId = course.lectureId;

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
      <tr key={course.registerId}>
        <td>{index + 1}</td>
        <td>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleCancel(course)}
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

  const handleBulkApply = async () => {
    const stdtId = 20250001;

    if (cartList.length === 0) {
      alert("장바구니에 강좌가 없습니다.");
      return;
    }

    // 우선순위 정렬
    const sortedList = [...cartList].sort((a, b) => {
      const p1 = parseInt(a.priorityOrder ?? 9999, 10);
      const p2 = parseInt(b.priorityOrder ?? 9999, 10);
      return p1 - p2;
    });


    let successCount = 0;

    for (const course of sortedList) {
      const lectureId = course.lectureId || course.lecture?.lectureId;

      if (!lectureId || enrolledCourses.some(c => c.lectureId === lectureId)) {
        continue;
      }

      const data = {
        stdtId,
        lectureId,
        applyDate: new Date().toISOString(),
      };

      try {
        const response = await fetch("http://localhost:8080/api/mycourses/enroll", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          successCount++;
        }
      } catch (error) {
        console.error(`❌ 강의 ${lectureId} 신청 중 오류:`, error);
      }
    }

    if (successCount > 0) {
      alert(`${successCount}개의 강좌를 일괄 신청했습니다.`);
      fetchEnrolledCourses(); // 수강신청 목록 갱신
    } else {
      alert("신청 가능한 강의가 없거나 모두 실패했습니다.");
    }
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
        <LectureList lectures={courseList} buttonLabel="신청" onClick={handleApply} />
      </div>

      {/* 장바구니 강좌 */}
      <div className="mb-4 mt-4">
        <h5 className="fw-bold mb-2 border p-2 d-inline-block">장바구니 강좌</h5>
        <button className="btn btn-primary" onClick={handleBulkApply}>일괄신청</button>
        <LectureList lectures={cartList} buttonLabel="신청" onClick={handleApply} />
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
