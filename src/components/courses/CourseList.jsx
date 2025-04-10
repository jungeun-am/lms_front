'use client';

import React from 'react';

const CourseList = ({ courseList, cartList, onAddToCart }) => {
  return (
    <div className="mb-3">
      <h5 className="fw-bold mb-2 border p-2 d-inline-block">개설강좌 목록</h5>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
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
                  onClick={() => onAddToCart(course)}
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
      </div>
    </div>
  );
};

export default CourseList;
