
"use client";
import React, { useState } from "react";
import "@/app/(dashboard)/mycourses/Attendance.css";

const Attendance = () => {
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const attendanceData = [
    {
      id: 1,
      courseName: "동물보호법, 확장용",
      instructor: "이수민",
      attendanceRate: 92,
      weeklyStatus: ["출석", "출석", "결석", "출석", "출석"],
    },
    {
      id: 2,
      courseName: "비상경계 심플 안전교육",
      instructor: "박은정",
      attendanceRate: 60,
      weeklyStatus: ["결석", "결석", "출석", "결석", "출석"],
    },
    {
      id: 3,
      courseName: "스마트 자율 운영 교육",
      instructor: "김영호",
      attendanceRate: 75,
      weeklyStatus: ["출석", "출석", "출석", "결석", "출석"],
    },
  ];

  const selectedCourse = attendanceData.find(c => c.id === selectedCourseId);

  return (
    <div className="attendance-wrapper">
      {/* 왼쪽: 강의 리스트 */}
      <div className="attendance-container">
        <h1>출석률 확인</h1>
        <p>나의 수강 강의 출석률 현황입니다.</p>

        {attendanceData.map((course) => (
          <div
            key={course.id}
            className="attendance-card"
            onClick={() => setSelectedCourseId(course.id)}
          >
            <h3 className="clickable">{course.courseName}</h3>
            <p>강의자: {course.instructor}</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${course.attendanceRate}%` }}
              >
                {course.attendanceRate}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 오른쪽: 주차별 출석현황 */}
      <div className="weekly-view">
        {selectedCourse ? (
          <>
            <h2>{selectedCourse.courseName} - 주차별 출석</h2>
            <ul>
              {selectedCourse.weeklyStatus.map((status, idx) => (
                <li key={idx}>
                  {idx + 1}주차:{" "}
                  <span className={status === "출석" ? "present" : "absent"}>
                    {status}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="empty-text">강좌를 선택하면 주차별 출석현황이 표시됩니다.</p>
        )}
      </div>
    </div>
  );
};

export default Attendance;
