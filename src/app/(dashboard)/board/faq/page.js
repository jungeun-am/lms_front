"use client";
import React, { useState } from "react";
import "@/app/(dashboard)/board/faq/Faq.css";
const faqs = [
  {
    question: "LMS에 로그인이 되지 않아요.",
    answer: "학번 또는 교직원 번호와 비밀번호를 다시 확인해 주세요. 비밀번호를 잊으셨다면 비밀번호 찾기 기능을 이용하세요.",
  },
  {
    question: "강의 영상이 재생되지 않아요.",
    answer: "크롬 브라우저를 사용해 보시고, 팝업 차단이나 확장 프로그램이 영향을 줄 수 있으니 확인해 주세요.",
  },
  {
    question: "과제를 제출했는데 제출 완료가 안 떠요.",
    answer: "파일이 정상적으로 업로드 되었는지 확인하고, 용량 제한(보통 100MB 이하)을 초과하지 않았는지 확인해 주세요.",
  },
  {
    question: "강의 수강 완료 조건이 뭔가요?",
    answer: "강의 영상의 90% 이상을 시청하면 수강 완료로 인정됩니다. 중간에 창을 닫지 않도록 주의하세요.",
  },
  {
    question: "모바일에서도 LMS를 사용할 수 있나요?",
    answer: "네, LMS는 모바일에서도 접속 가능하며, 모바일 웹 또는 LMS 전용 앱을 이용해 주세요.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>자주 묻는 질문</h1>
      <p>서비스 이용 시 자주 묻는 질문과 답변입니다.</p>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button className="faq-question" onClick={() => toggleAnswer(index)}>
              {faq.question}
            </button>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
