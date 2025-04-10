import CourseList from "@/components/courses/CourseList";
import React, {useState} from "react";

const OpenLecture = ({ courseList, cartList, onAddToCart }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const filteredCourses = courseList.filter(
    (course) =>
      (level === "" || course.subject_level === level) &&
      (professor === "" || course.department.includes(professor))
  );

  const totalCredits = enrolledCourses.reduce(
    (sum, course) => sum + parseInt(course.credit),
    0
  );

  const renderCourseRows = () => {
    if (!Array.isArray(filteredCourses) || filteredCourses.length === 0) {
      return <tr><td colSpan="9" className="text-muted">개설된 강좌가 없습니다!</td></tr>;
    }
    return filteredCourses.map((course, index) => (
      <tr key={course.lecture_id}>
        <td>{index + 1}</td>
        <td>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => toggleEnrollment(course)}
            disabled={cartCourses.some((c) => c.lecture_id === course.lecture_id)}
          >
            신청
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
    ));
  };


  {/* 개설강좌 */}
  return (
    <div className="mb-4">
      <h5 className="fw-bold mb-2 border p-2 d-inline-block">개설강좌 목록</h5>
      <table className="table table-bordered text-center" style={{tableLayout: "fixed", width: "100%"}}>
        <thead className="table-primary">
        <tr>
          <th>NO</th>
          <th>신청</th>
          <th>이수구분</th>
          <th>개설전공학과</th>
          <th>교과목코드</th>
          <th>교과목명</th>
          <th>교과목 수준</th>
          <th>학점</th>
          <th>시간표</th>
        </tr>
        </thead>
        <tbody>{renderCourseRows()}</tbody>
      </table>
    </div>
  );
}

export default OpenLecture;
