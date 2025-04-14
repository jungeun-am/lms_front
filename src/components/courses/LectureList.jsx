const LectureList = ({ lectures = [], buttonLabel, onClick, isDisabled }) => {
  return (
    <table className="table table-bordered text-center" style={{ tableLayout: 'fixed', width: '100%' }}>
      <thead className="table-primary">
      <tr>
        <th>NO</th>
        <th>{buttonLabel}</th>
        <th>이수구분</th>
        <th>개설전공학과</th>
        <th>교과목코드</th>
        <th>교과목명</th>
        <th>교과목 수준</th>
        <th>학점</th>
        <th>시간표</th>
      </tr>
      </thead>
      <tbody>
      {lectures.length === 0 ? (
        <tr>
          <td colSpan={9} className="text-muted">개설된 강좌가 없습니다!</td>
        </tr>
      ) : (
        lectures.map((lecture, index) => (
          <tr key={lecture.lectureId}>
            <td>{index + 1}</td>
            <td>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => onClick(lecture)}
                disabled={isDisabled?.(lecture)}
              >
                {buttonLabel}
              </button>
            </td>
            <td>{lecture.courseType}</td>
            <td>{lecture.department}</td>
            <td>{lecture.subjectCode}</td>
            <td>{lecture.subjectName}</td>
            <td>{lecture.subjectLevel}</td>
            <td>{lecture.credit}</td>
            <td>{lecture.timetable}</td>
          </tr>
        ))
      )}
      </tbody>
    </table>
  );
};
export default LectureList;
