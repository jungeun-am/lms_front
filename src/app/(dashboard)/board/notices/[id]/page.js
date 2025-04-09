import "@/app/(dashboard)/board/notices/detail.css";

export default function NoticeDetail({ params }) {
  const { id } = params;

  const notices = [
    {
      id: "1",
      title: "LMS 서비스 중단 안내",
      content: "LMS 서비스가 잠시 중단됩니다. 시스템 점검이 완료되면 다시 안내드리겠습니다.",
      author: "관리자",
      createdAt: "2025-04-03 10:30",
    },
    {
      id: "2",
      title: "신입생 학번으로 로그인 하시기 바랍니다.",
      content: "신입생은 학번으로 로그인 해주세요. 정확한 로그인 방법은 아래 안내를 참고하세요.",
      author: "입학처",
      createdAt: "2025-04-02 17:10",
    },
  ];

  const notice = notices.find((item) => item.id === id);

  if (!notice) {
    return <div>해당 공지사항을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="notice-detail-container">
      {/* 제목 박스 */}
      <div className="notice-header">
        <h1 className="notice-title">{notice.title}</h1>
      </div>

      {/* 메타정보 */}
      <div className="notice-meta">
        <div><span className="meta-label">No.</span> {notice.id}</div>
        <div><span className="meta-label">작성자</span> {notice.author}</div>
        <div><span className="meta-label">작성일시</span> {notice.createdAt}</div>
      </div>

      <hr className="notice-divider" />

      {/* 본문 */}
      <div className="notice-content">{notice.content}</div>
    </div>
  );
}
