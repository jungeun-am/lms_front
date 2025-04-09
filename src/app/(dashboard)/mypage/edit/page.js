'use client';

import React, { useState } from 'react';
import "@/app/(dashboard)/mypage/mypage.css";

const Mypage = () => {

  const [form, setForm] = useState({
    studentId: '20190427',
    name: '임정은',
    englishName: 'Jungeun Lim',
    email: 'jungeun054@eduksung.ac.kr',
    language: '자동',
    department: '사회과학대학',
    major: '국제통상학과',
    phone: '01043850504'
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = () => {
    alert('정보가 수정되었습니다.');
    console.log(form);
  };

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">임정은</h4>

      {/* 필수 입력사항 */}
      <section className="mb-4">
        <h5 className="fw-bold border-bottom pb-2">필수 입력사항</h5>
        <div className="row mb-2">
          <label className="col-sm-2 col-form-label">학번</label>
          <div className="col-sm-10 pt-2">{form.studentId}</div>
        </div>
        <div className="row mb-2">
          <label className="col-sm-2 col-form-label">한글 이름</label>
          <div className="col-sm-10">
            <input className="form-control" name="name" value={form.name} onChange={handleChange} />
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-sm-2 col-form-label">영문 이름</label>
          <div className="col-sm-10">
            <input className="form-control" name="englishName" value={form.englishName} onChange={handleChange} />
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-sm-2 col-form-label">이메일 주소</label>
          <div className="col-sm-10">
            <input className="form-control" name="email" value={form.email} onChange={handleChange} />
          </div>
        </div>

      </section>


      {/* 기타 */}
      <section className="mb-4">
        <h5 className="fw-bold border-bottom pb-2">기타</h5>
        <div className="row mb-2">
          <label className="col-sm-2 col-form-label">소속기관</label>
          <div className="col-sm-10">
            <input className="form-control" name="department" value={form.department} onChange={handleChange} />
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-sm-2 col-form-label">소속부서</label>
          <div className="col-sm-10">
            <input className="form-control" name="major" value={form.major} onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <label className="col-sm-2 col-form-label">휴대 전화</label>
          <div className="col-sm-10">
            <input className="form-control" name="phone" value={form.phone} onChange={handleChange} />
          </div>
        </div>
      </section>

      <div className="text-end">
        <button className="btn btn-primary px-4" onClick={handleSubmit}>정보수정</button>
      </div>
    </div>
  );
};

export default Mypage;
