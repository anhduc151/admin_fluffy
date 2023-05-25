// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilBookReader,
  UilHeadSide,
  UilBill,
  UilFolderQuestion,
  UilBooks,
  UilCommentMessage,
  UilAirplay,
  // UilSignOutAlt,
} from "@iconscout/react-unicons";


// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    id: 1,
    url: '/',
    icon: UilEstate,
    heading: "Dashboard",
  },
  {
    id: 2,
    url: '/students',
    icon: UilBookReader,
    heading: 'Student'
  },
  {
    id: 3,
    url: '/tutors',
    icon: UilHeadSide,
    heading: 'Tutor'
  },
  {
    id: 4,
    url: '/request',
    icon: UilFolderQuestion,
    heading: 'Request'
  },
  {
    id: 5,
    url: '/payment',
    icon: UilBill,
    heading: 'Payment'
  },
  {
    id: 6,
    url: '/session',
    icon: UilBooks,
    heading: 'Session'
  },
  {
    id: 7,
    url: '/messages',
    icon: UilCommentMessage,
    heading: 'Messages'
  },
  {
    id: 8,
    url: '/courses',
    icon: UilAirplay,
    heading: 'Courses'
  },
];


// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];
