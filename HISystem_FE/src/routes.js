import Login from "views/examples/Login.js";
import patient from "views/page/Patient";
import User from "views/page/User";
import Board from "views/page/Board";
import Receipt from "views/page/Receipt";
import Reservation from "views/page/Reservation";
import Duty from "views/page/Duty";
import diagnosis from "views/page/diagnosis";
import Acceptance from "views/page/Acceptance";
import MainHeader from "components/Headers/MainHeader";
import Mainpage from "views/page/Mainpage";
import Proof from "views/page/Proof";
import Index from "views/Index";
import Untact from "views/page/Untact";

// 원본 live demo 
// https://demos.creative-tim.com/argon-dashboard-react/?_ga=2.133404170.52756513.1638148544-1579452682.1636686977#/admin/index
// 참고문서
// https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar
/* 
  원무 : 접수/수납/제증명관리/입,퇴원
  HIS : 진료
  관리자 : 직원관리
  공통: 예약/환자관리(관리자x)/공지
  (주요)모달: 환자검색/달력/공지/환자메모/직원/채팅
*/
/*
  route.js에 대한 설명
  url : layout/path
  path : 기능이랑 무방
  icon : navbar 좌측 icon
  (중요)component : 바탕(layout)에 들어올 component
  (중요)layout : 바탕이 되는 화면. route 설정은 index.js
  (중요)redirect시 url기준으로 이동
*/
/*
  용어 정리
  - 원무
    접수관리 : receipt / table : reservation
    수납관리 : acceptance / table : receipt
    제증명관리 : proof / table : 無
    입,퇴원관리 : hospitalization / table : hospitalization
  - HIS
    진료관리 : diagnosis / table : diagnosis
  - 공통
    예약관리 : reservation / table : reservation
    환자관리 : patient / table : patient
    공지 : board / table : board
  - 관리자
    직원관리 : employee / table : user
*/
/*
  user role 정리
  1 = 원무과
  2 = 간호사
  3 = 수간호사
  4 = 의사
  9 = 관리자
  999 = 개발용
*/
var routes = [
  { // main page
    path: "/main",
    name: "HOME",
    icon: "ni ni-shop text-defalut",
    component: Index,
    layout: "/admin",
    role: [1, 2, 3, 4, 9, 999]
  },

  // 원무
  { // 접수관리 [main page]
    path: "/receipt",
    name: "접수관리",
    icon: "ni ni-tv-2 text-primary",
    component: Receipt,
    layout: "/admin",
    role: [1, 999]
  },
  // 공통
  { // 예약관리 [원무, HIS 공통]
    path: "/reservation",
    name: "예약관리",
    icon: "ni ni-time-alarm text-danger",
    component: Reservation,
    layout: "/admin",
    role: [1, 2, 3, 4, 999]
  },

   // 공통
   { // 비대면 접수 관리 [원무, HIS 공통]
    path: "/untact",
    name: "비대면 접수 관리",
    icon: "ni ni-tv-2 text-success",
    component: Untact,
    layout: "/admin",
    role: [1, 2, 3, 4, 999]
  },

  
  // {// 입,퇴원관리
  //   path: "/hospitalization",
  //   name: "입/퇴원관리",
  //   icon: "ni ni-archive-2 text-yellow",
  //   component: Profile,
  //   layout: "/admin",
  //   role: [1, 999]
  // },
  // HIS
  { // 진료관리
    path: "/diagnosis",
    name: "진료관리",
    icon: "ni ni-bullet-list-67 text-warning",
    component: diagnosis,
    layout: "/admin",
    role: [2, 3, 4, 999]
  },
  {// 수납관리
    path: "/acceptance",
    name: "수납관리",
    icon: "ni ni-money-coins text-defalut",
    component: Acceptance,
    layout: "/admin",
    role: [1, 999]
  },
  {// 제증명관리
    path: "/proof",
    name: "제증명관리",
    icon: "ni ni-single-copy-04 text-yellow",
    component: Proof,
    layout: "/admin",
    role: [1, 999]
  },
  { // 환자관리
    path: "/patient",
    name: "환자관리",
    icon: "ni ni-single-02 text-success",
    component: patient,
    layout: "/admin",
    role: [1, 2, 3, 4, 999]
  },
  // 관리자
  { // 직원관리
    path: "/user",
    name: "직원관리",
    icon: "ni ni-badge text-blue",
    component: User,
    layout: "/admin",
    role: [9, 999]
  },
  { // 공지사항
    path: "/board",
    name: "공지사항",
    icon: "ni ni-notification-70 text-info",
    component: Board,
    layout: "/admin",
    role: [1, 2, 3, 4, 9, 999]
  },
  // 아래는 Route 등록용 (네비게이션엔 표시 안 함 => useYn false로 할 것)
  { // Login 
    path: "/login",
    name: "[개발용]로그인",
    icon: "ni ni-time-alarm text-yellow",
    component: Login,
    layout: "/auth",

    useYn: false // path만 지정하고 side bar에 표시 안 하고 싶으면 false로 설정하기
  },
  { // 직원관리
    path: "/duty",
    name: "근무표",
    icon: "ni ni-badge text-info",
    component: Duty,
    layout: "/admin",

    useYn: false
  },
];
export default routes;
