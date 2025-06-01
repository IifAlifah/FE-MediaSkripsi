import { FaChartPie, FaUsers, FaClipboardList } from "react-icons/fa";

const menuDataAdmin = [
  {
    title: "Dashboard",
    to: "/dashboardDosen",
    icon: FaChartPie
  },
  {
    title: "Data Mahasiswa",
    to: "/dataMahasiswa",
    icon: FaUsers
  },
  {
    title: "Data Nilai",
    to: "/dataNilai",
    icon: FaClipboardList
  }
];

export default menuDataAdmin;
