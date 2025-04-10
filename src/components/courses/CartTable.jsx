'use client';

import React from 'react';

const CartTable = ({ cartList, priorities, onPriorityChange, onRemoveFromCart, onSave }) => {
  return (
    <div className="mb-3">
      <div className="d-flex align-items-center justify-content-between mb-2 mt-4">
        <h5 className="fw-bold mb-0 border p-2 d-inline-block">장바구니 수강목록</h5>
        <button className="btn btn-primary" onClick={onSave}>작업저장</button>
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
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={priorities[course.id] || ''}
                  onChange={(e) => onPriorityChange(course.id, e.target.value)}
                />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onRemoveFromCart(course.id)}
                >
                  삭제
                </button>
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
  );
};

export default CartTable;
