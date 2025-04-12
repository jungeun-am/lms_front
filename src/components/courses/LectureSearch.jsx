'use client';

import React, { useRef } from "react";

const LectureSearch = ({ onSearch }) => {
  const typeRef = useRef(null);
  const keywordRef = useRef(null);

  const handleSearch = () => {
    const type = typeRef.current.value;
    const keyword = keywordRef.current.value;

    if (!type) {
      alert("검색조건을 선택해주세요.");
      return;
    }
    onSearch(type, keyword);
  };

  return (
    <div className="search-box">
      <div className="search-box-row align-items-end">
        <div className="search-box-field">
          <label className="form-label mb-0" style={{ width: '80px' }}>검색조건</label>
          <select className="form-control" ref={typeRef} defaultValue="">
            <option value="">::선택::</option>
            <option value="courseType">이수구분</option>
            <option value="department">개설전공학과</option>
            <option value="subjectCode">교과목코드</option>
            <option value="subjectName">교과목명</option>
          </select>
        </div>
        <div className="search-box-field d-flex align-items-center gap-2" style={{ flexGrow: 1 }}>
          <label className="form-label mb-0" style={{ width: '80px' }}>검색어</label>
          <input type="text" className="form-control" ref={keywordRef} />
          <button className="btn btn-primary" onClick={handleSearch}>검색</button>
        </div>
      </div>
    </div>
  );
};

export default LectureSearch;
