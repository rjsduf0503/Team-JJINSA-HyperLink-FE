import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Avatar, Modal } from '@/components/common';
import { isAdminState } from '@/stores/auth';
import { myInfo } from '@/types/myInfo';
import * as style from './style.css';

const CAREER: { [key: string]: string } = {
  develop: '개발',
  beauty: '패션, 뷰티',
  finance: '경제, 금융',
  etc: '기타',
};

export const CAREER_YEAR: { [key: string]: string } = {
  lessThanOne: '신입',
  one: '1년차',
  two: '2년차',
  three: '3년차',
  four: '4년차',
  five: '5년차',
  six: '6년차',
  seven: '7년차',
  eight: '8년차',
  nine: '9년차',
  ten: '10년차',
  moreThanTen: '10+년차',
};

const MENU_LIST = {
  '북마크 / 히스토리': '/',
  '내 정보': '/mypage',
  로그아웃: 'logout',
};

export type MyInfoModalProps = {
  myInfoData: myInfo;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const MyInfoModal = ({
  myInfoData,
  isOpen,
  onClose,
  onLogout,
}: MyInfoModalProps) => {
  const navigate = useNavigate();
  const isAdmin = useRecoilState(isAdminState);

  const { email, nickname, career, careerYear, profileUrl } = myInfoData;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      type="icon"
      style={{ padding: '1.2rem', textAlign: 'start' }}
    >
      <div className={style.myInfo}>
        <Avatar src={profileUrl.toString()} shape="circle" size="medium" />
        <div className={style.myInfoDetail}>
          <div className={style.nickname}>{nickname}</div>
          <div className={style.career}>
            <span>{CAREER[career]}</span> |{' '}
            <span>경력 {CAREER_YEAR[careerYear]}</span>
          </div>
          <div className={style.email}>{email}</div>
        </div>
      </div>
      <ul>
        {Object.entries(MENU_LIST).map(([menuName, path], idx) => {
          return (
            <li
              key={idx}
              className={style.menuItem}
              onClick={path === 'logout' ? onLogout : () => navigate(path)}
            >
              {menuName}
            </li>
          );
        })}
        {isAdmin && (
          <li className={style.menuItem} onClick={() => navigate('/admin')}>
            관리자 페이지
          </li>
        )}
      </ul>
    </Modal>
  );
};

export default MyInfoModal;
