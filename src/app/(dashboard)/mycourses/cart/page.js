'use client';

import React, { useEffect, useState } from "react";
import "@/app/(dashboard)/mycourses/mycourses.css";
import LectureList from "@/components/courses/LectureList";

const Cart = () => {
  const [courseList, setCourseList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [priorities, setPriorities] = useState({});
  const [level, setLevel] = useState('');
  const [professor, setProfessor] = useState('');

  // ✅ 백엔드에서 강의 목록 불러오기
  useEffect(() => {
    fetchCourseList();
  }, []);

  const fetchCourseList = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/mycourses/cart", {
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

  const handleSearch = () => {
    console.log("검색 실행됨:", level, professor);
    // 여기에 추후 검색 필터 로직 연결 가능
  };

  const addToCart = (course) => {
    if (!cartList.find((c) => c.lecture_id === course.lecture_id)) {
      setCartList([...cartList, course]);
    }
  };

  const removeFromCart = (lecture_id) => {
    setCartList(cartList.filter((c) => c.lecture_id !== lecture_id));
    setPriorities((prev) => {
      const newPriorities = { ...prev };
      delete newPriorities[lecture_id];
      return newPriorities;
    });
  };

  const handlePriorityChange = (lecture_id, value) => {
    setPriorities({ ...priorities, [lecture_id]: value });
  };

  const handleSave = () => {
    alert('작업이 저장되었습니다!');
    console.log('저장된 우선순위:', priorities);
  };

  return (
    <div className="enrollment-container mb-3">
      <h5 className="fw-bold mb-0 border p-2 d-inline-block">검색</h5>
      <div className="search-box mb-3">
        <div className="d-flex align-items-center gap-3 mb-2">
          <label style={{ width: "80px" }}>교과 수준</label>
          <input
            className="form-control"
            style={{ flex: 1 }}
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <label style={{ width: "80px" }}>교수명</label>
          <input
            className="form-control"
            style={{ flex: 1 }}
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSearch}>검색</button>
      </div>

      <h5 className="fw-bold mb-2 border p-2 d-inline-block mt-4">개설강좌 목록</h5>
      <LectureList
        lectures={courseList}
        buttonLabel="담기"
        onClick={addToCart}
        isDisabled={(lecture) => cartList.some((c) => c.lecture_id === lecture.lecture_id)}
      />

      <div className="d-flex align-items-center justify-content-between mb-2 mt-4">
        <h5 className="fw-bold mb-0 border p-2 d-inline-block">장바구니 수강목록</h5>
        <button className="btn btn-primary" onClick={handleSave}>작업저장</button>
      </div>

      <table className="table table-bordered text-center" style={{ tableLayout: 'fixed', width: '100%' }}>
        <thead className="table-primary">
        <tr>
          <th>NO</th>
          <th>우선순위</th>
          <th>삭제</th>
          <th>이수구분</th>
          <th>개설전공학과</th>
          <th>교과목코드</th>
          <th>교과목명</th>
          <th>교과목 수준</th>
          <th>학점</th>
          <th>시간표</th>
        </tr>
        </thead>
        <tbody>
        {cartList.length === 0 ? (
          <tr>
            <td colSpan={10} className="text-muted">장바구니에 담긴 과목이 없습니다.</td>
          </tr>
        ) : (
          cartList.map((course, index) => (
            <tr key={course.lecture_id}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "80px" }}
                  value={priorities[course.lecture_id] || ''}
                  onChange={(e) => handlePriorityChange(course.lecture_id, e.target.value)}
                />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeFromCart(course.lecture_id)}
                >
                  삭제
                </button>
              </td>
              <td>{course.course_type}</td>
              <td>{course.department}</td>
              <td>{course.subject_code}</td>
              <td>{course.subject_name}</td>
              <td>{course.subject_level}</td>
              <td>{course.credit}</td>
              <td>{course.timetable}</td>
            </tr>
          ))
        )}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
