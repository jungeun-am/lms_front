import Link from 'next/link';
import {FaCalendarCheck, FaTachometerAlt,FaFileAlt, FaBookOpen, FaUserEdit, FaClipboardList, FaHistory, FaClipboardCheck, FaBullhorn, FaQuestionCircle, FaEnvelope } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        {/* Mypage */}
        <li>
          <h3>Mypage</h3>
          <ul>
            <li><Link href="/mycourses/mycourses"><FaBookOpen /> 수강하고 있는 강좌</Link></li>
            <li><Link href="/mypage/edit"><FaUserEdit /> 개인정보 수정</Link></li>
            <li><Link href="/mypage/score"><FaFileAlt /> 성적확인</Link></li>
          </ul>
        </li>

        {/* 나의 강좌 */}
        <li>
          <h3>나의 강좌</h3>
          <ul>
            <li><Link href="/mycourses/mycourses"><FaClipboardList /> 수강중인 강좌</Link></li>
            <li><Link href="/mycourses/attendance">< FaCalendarCheck />출석률</Link></li>
            <li><Link href="/mycourses/oldcourses"><FaHistory /> 구 강좌</Link></li>
          </ul>
        </li>

        {/* 장바구니 */}
        <li>
          <Link href="/mycourses/cart"><FaClipboardList /> 장바구니</Link>
        </li>

        {/* 수강신청 */}
        <li><Link href="/mycourses/enrollment"><FaClipboardCheck /> 수강신청</Link></li>

        {/* 게시판 */}
        <li>
          <h3>게시판</h3>
          <ul>
            <li><Link href="/board/notices"><FaBullhorn /> 공지사항</Link></li>
            <li><Link href="/board/faq"><FaQuestionCircle /> FAQ</Link></li>
          </ul>
        </li>

        {/* 메시지 */}
        <li><Link href="/message"><FaEnvelope /> 메시지함</Link></li>
      </ul>
    </div>
  );
}
