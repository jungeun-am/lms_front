'use client'

import React, { useState } from "react";
import "@/app/(dashboard)/mycourses/mycourses.css";

const Cart = () => {
  const [courseList] = useState([
    { id: 1, code: 'CS101', name: '프로그래밍 기초', category: '전공필수', professor: '홍길동', schedule: '월 1-2교시' },
    { id: 2, code: 'CS102', name: '자료구조', category: '전공선택', professor: '이몽룡', schedule: '화 3-4교시' },
    { id: 3, code: 'CS103', name: '운영체제', category: '전공필수', professor: '성춘향', schedule: '수 5-6교시' },
  ]);

  const [cartList, setCartList] = useState([]);
  const [priorities, setPriorities] = useState({});
  const [level, setLevel] = useState('');
  const [professor, setProfessor] = useState('');

  const addToCart = (course) => {
    if (!cartList.find((c) => c.id === course.id)) {
      setCartList([...cartList, course]);
    }
  };

  const removeFromCart = (id) => {
    setCartList(cartList.filter((c) => c.id !== id));
    setPriorities((prev) => {
      const newPriorities = { ...prev };
      delete newPriorities[id];
      return newPriorities;
    });
  };

  const handlePriorityChange = (id, value) => {
    setPriorities({ ...priorities, [id]: value });
  };

  const handleSave = () => {
    alert('작업이 저장되었습니다!');
    console.log('저장된 우선순위:', priorities);
  };

  return (
      <div className="enrollment-container mb-3">
        <h5 className="fw-bold mb-0 border p-2 d-inline-block">검색</h5>
      {/* 검색 */}
      <div className="search-box">
        <div className="search-box-row">
        <div className="search-box-field">
          <label className="form-label mb-0" style={{ width: '80px' }}>선택</label>
          <select className="form-control" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="">전체</option>
            <option value="course_type">이수구분</option>
            <option value="department">개설전공학과</option>
            {/*<option value="subject_code">교과목코드</option>*/}
            <option value="subject_name">교과목명</option>
          </select>
        </div>

        <div className="search-box-field" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexGrow: 1 }}>
          <label className="form-label mb-0" style={{ width: '80px' }}>검색</label>
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

      <div className="mb-3">
        <h5 className="fw-bold mb-2 border p-2 d-inline-block">개설강좌 목록</h5>
        <table className="table table-bordered text-center" style={{ tableLayout: 'fixed', width: '100%' }}>
          <thead className="table-primary">
          <tr>
            <th>NO</th>
            <th>장바구니</th>
            <th>이수구분</th>
            <th>교과목코드</th>
            <th>교과목명</th>
            <th>담당교수</th>
            <th>시간표</th>
          </tr>
          </thead>
          <tbody>
          {courseList.map((course, index) => (
            <tr key={course.id}>
              <td>{index + 1}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => addToCart(course)}
                  disabled={cartList.find((c) => c.id === course.id)}
                >
                  담기
                </button>
              </td>
              <td>{course.category}</td>
              <td>{course.code}</td>
              <td>{course.name}</td>
              <td>{course.professor}</td>
              <td>{course.schedule}</td>
            </tr>
          ))}
          </tbody>
        </table>

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
            <th>교과목코드</th>
            <th>교과목명</th>
            <th>담당교수</th>
            <th>시간표</th>
          </tr>
          </thead>
          <tbody>
          {cartList.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-muted">장바구니에 담긴 과목이 없습니다.</td>
            </tr>
          ) : (
            cartList.map((course, index) => (
              <tr key={course.id}>
                <td>{index + 1}</td>
                <td colSpan={2}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="text"
                      className="form-control"
                      value={priorities[course.id] || ''}
                      onChange={(e) => handlePriorityChange(course.id, e.target.value)}
                    />
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromCart(course.id)}
                    >
                      삭제
                    </button>
                  </div>
                </td>
                <td>{course.category}</td>
                <td>{course.code}</td>
                <td>{course.name}</td>
                <td>{course.professor}</td>
                <td>{course.schedule}</td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default Cart;
