"use client";
import React from "react";
import Link from "next/link";
import "@/app/(dashboard)/mycourses/mycourses-view.css"; // 스타일 파일 불러오기
import { FaPlay, FaUpload } from "react-icons/fa"; // 아이콘

const CourseDetail = () => {
  const courseId = 1; // 실제로는 동적 경로에서 받아야 할 수도 있음

  const courseData = [
    {
      week: "3월04일 - 3월10일",
      activities: [
        { title: "강의안 1", type: "PPT", link: "#" },
        { title: "통계프로그램_R 분석", type: "PPT", link: "#" },
        { title: "1주차 두번째 강의안", type: "PPT", link: "#" },
      ],
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      week: "3월11일 - 3월17일",
      activities: [
        { title: "시장조사단계_개관", type: "PPT", link: "#" },
        { title: "JupyterLab 설치하기", type: "PPT", link: "#" },
      ],
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      week: "3월18일 - 3월24일",
      activities: [
        { title: "강의안 보완", type: "PPT", link: "#" },
        { title: "디지털 기술경영전공과 관련된 학습 자료", type: "PPT", link: "#" },
      ],
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  return (
    <div className="course-detail-container">
      <h1>강좌 상세보기</h1>
      <h2>주차별 학습 활동</h2>

      {courseData.map((weekData, index) => (
        <div key={index} className="week-section">
          <h3>{weekData.week}</h3>

          {/* 동영상 보기 */}
          <div>
            <h4>동영상</h4>
            <a href={weekData.video} target="_blank" rel="noopener noreferrer">
              <button className="view-video-btn">
                <FaPlay /> 동영상 보기
              </button>
            </a>
          </div>

          {/* 과제 제출 버튼 */}
          <div>
            <h4>과제 제출</h4>
            <Link href={`/mycourses/mycourses-view/${index + 1}`}>
              <button className="submit-assignment-btn">
                <FaUpload /> {index + 1}주차 과제 제출
              </button>
            </Link>
          </div>

          {/* 학습 자료 */}
          <h4>학습 자료</h4>
          <ul>
            {weekData.activities.map((activity, idx) => (
              <li key={idx} className="activity-item">
                <Link href={activity.link}>
                  <span className="activity-link">
                    {activity.title} - {activity.type}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CourseDetail;
