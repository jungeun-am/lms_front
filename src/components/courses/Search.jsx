import React, { useRef } from 'react';

//{ level, setLevel, professor, setProfessor, goLectureFind }

const Search = () => {
  const ftypeRef = useRef(null);
  const fkeyRef = useRef(null);

  const goLectureFind = () => {
    alert("goLectureFind") ;
    console.log(ftypeRef.current.value, fkeyRef.current.value);



  }

  return (
    <div className="enrollment-container mb-3">
      <h5 className="fw-bold mb-0 border p-2 d-inline-block">검색</h5>
      <div className="search-box">
        <div className="search-box-row align-items-end">
          <div className="search-box-field">
            <label className="form-label mb-0" style={{ width: '80px' }}>수준</label>
            <select
              className="form-control"
              ref={ftypeRef}
              id="findtype" name="findtype" defaultValue=""
            >
              <option value="">전체</option>
              <option value="course_type">이수구분</option>
              <option value="department">개설전공학과</option>
              <option value="subject_code">교과목코드</option>
              <option value="subject_name">교과목명</option>
            </select>
          </div>

          <div className="search-box-field d-flex align-items-center gap-2" style={{ flexGrow: 1 }}>
            <label className="form-label mb-0" style={{ width: '80px' }}>검색어</label>
            <input type="text" className="form-control" id="findkey" name="findkey"  ref={fkeyRef} />
            <button
              className="btn btn-primary" id="findbtn" onClick={goLectureFind}
             >
              검색
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
