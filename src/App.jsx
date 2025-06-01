import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Tentang from "./pages/tentang";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Mahasiswa/dashboard";
// import MateriDOM from "./pages/Mahasiswa/materiDom";
import DashboardDosen from "./pages/Dosen/dashboardDosen";
import EditorOutput from "./pages/editor";
import DataMahasiswaPage from "./pages/Dosen/dataMahasiswa";
import DataNilaiPage from "./pages/Dosen/dataNilai";
import MateriDomTree from "./pages/Mahasiswa/materiDomTree";
import MateriNode from "./pages/Mahasiswa/materiNode";
// import MateriMetodePropertiDOM from "./pages/Mahasiswa/materiMetodeProperti";
import MateriId from "./pages/Mahasiswa/materiGetElementById";
import MateriTagname from "./pages/Mahasiswa/materiGetElementByTagname";
import MateriClassname from "./pages/Mahasiswa/materiGetElementByClassname";
import MaterinodeTraversing from "./pages/Mahasiswa/materiNodeTraversing";
import MateriquerySelector from "./pages/Mahasiswa/materiquerySelector";
import MateriMengubahKonten from "./pages/Mahasiswa/materiMengubahKonten";
import MateriMenambahMenghapus from "./pages/Mahasiswa/materiMenambah_Menghapus";
import MateriMengubahCss from "./pages/Mahasiswa/materiMengubahCss";
import MateriMengenalEvent from "./pages/Mahasiswa/materiMengenalEvent";
import MateriPerambatanEvent from "./pages/Mahasiswa/materiPerambatanEvent";
import MateriMenghentikanEventBawaan from "./pages/Mahasiswa/materiMenghentikanEventBawaan";
// import Kuis1 from "./pages/Mahasiswa/Kuis/kuis1";
import Kuis2 from "./pages/Mahasiswa/Kuis/kuis2";
import Kuis3 from "./pages/Mahasiswa/Kuis/kuis3";
import Kuis4 from "./pages/Mahasiswa/Kuis/kuis4";
import Kuis5 from "./pages/Mahasiswa/Kuis/kuis5";
import MateriPengenalanObject from "./pages/Mahasiswa/materiPengenalanObject";
import HasilKuis from "./components/hasil";
// import Evaluasi from "./pages/Mahasiswa/evaluasi";
import ProtectedRoute from "./components/protectedRoute";
import EditUserPage from "./pages/editMahasiswa";
import MateriMemanipulasiAtributElemen from "./pages/Mahasiswa/materiMemanipulasiAtribut";
import MateriMenanganiEventDom from "./pages/Mahasiswa/materiMenanganiEventDom";
import MateriFormDom from "./pages/Mahasiswa/materiEventForm";
// import MateriMenanganiEventForm from "./pages/Mahasiswa/materiMenanganiForm";
import MateriValidasiForm from "./pages/Mahasiswa/materiValidasiForm";
import Kuis6 from "./pages/Mahasiswa/Kuis/kuis6";
import Evaluasi from "./pages/Mahasiswa/Kuis/evaluasi";
import PenutupEvaluasi from "./pages/materiSelesai";
import EditorPage from "./pages/codeEditor";
import PetunjukPenggunaan from "./pages/petunjukPenggunaan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor" element={<EditorOutput />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/petunjukPenggunaan" element={<PetunjukPenggunaan />} />

        {/* Mahasiswa */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="mahasiswa">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/codeEditor"
          element={
            <ProtectedRoute role="mahasiswa">
              <EditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hasil-kuis"
          element={
            <ProtectedRoute role="mahasiswa">
              <HasilKuis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kuisDone"
          element={
            <ProtectedRoute role="mahasiswa">
              <HasilKuis />
            </ProtectedRoute>
          }
        />


        {/* sub pengenalan object */}
        <Route
          path="/materi/materiPengenalanObject"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={0}>
              <MateriPengenalanObject />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/kuis1"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={1}>
              <Kuis1 />
            </ProtectedRoute>
          }
        /> */}
        
        {/* sub pengenalan dom */}
        {/* <Route
          path="/materi/materiDom"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={1}>
              <MateriDOM />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/materi/domTree"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={1}>
              <MateriDomTree />
            </ProtectedRoute>
          }
        />
        <Route
          path="/materi/node"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={2}>
              <MateriNode />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/materi/metode-properti"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={5}>
              <MateriMetodePropertiDOM />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/kuis2"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={3}>
              <Kuis2 />
            </ProtectedRoute>
          }
        />

        {/* sub mengakses dom */}
        <Route
          path="/materi/id"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={4}>
              <MateriId />
            </ProtectedRoute>
          }
        />
        <Route
          path="/materi/tagname"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={5}>
              <MateriTagname />
            </ProtectedRoute>
          }
        />
        <Route
          path="/materi/classname"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={6}>
              <MateriClassname />
            </ProtectedRoute>
          }
        />
        <Route
          path="/materi/querySelector"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={7}>
              <MateriquerySelector />
            </ProtectedRoute>
          }
        />
        <Route
          path="/materi/nodeTraversing"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={8}>
              <MaterinodeTraversing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kuis3"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={9}>
              <Kuis3 />
            </ProtectedRoute>
          }
        />

        {/* sub manipulasi dom */}
        <Route
          path="/materi/mengubahKonten"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={10}>
              <MateriMengubahKonten />
            </ProtectedRoute>
          }
        />
        <Route
          path="/materi/memanipulasiAtributElemen"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={11}>
              <MateriMemanipulasiAtributElemen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/materi/menambah_menghapus"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={12}>
              <MateriMenambahMenghapus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/materi/mengubahCss"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={13}>
              <MateriMengubahCss />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kuis4"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={14}>
              <Kuis4 />
            </ProtectedRoute>
          }
        />

        {/* sub event */}
        <Route
          path="/materi/mengenalEvent"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={15}>
              <MateriMengenalEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/materi/menanganiEventDom"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={16}>
              <MateriMenanganiEventDom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/materi/menghentikanEventBawaan"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={17}>
              <MateriMenghentikanEventBawaan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/materi/perambatanEvent"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={18}>
              <MateriPerambatanEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kuis5"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={19}>
              <Kuis5 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/materi/mengaksesForm-elemenForm"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={20}>
              <MateriFormDom />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/materi/menanganiEventFormDom"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={24}>
              <MateriMenanganiEventForm />
            </ProtectedRoute>
          }
        /> */}

          <Route
          path="/materi/validasiForm"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={21}>
              <MateriValidasiForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kuis6"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={22}>
              <Kuis6 />
            </ProtectedRoute>
          }
        />
        
        evaluasi
        <Route
          path="/evaluasi"
          element={
            <ProtectedRoute role="mahasiswa" requiredProgress={23}>
              <Evaluasi />
            </ProtectedRoute>
          }
        />

        <Route
          path="/selesai"
          element={
            <ProtectedRoute role="mahasiswa">
              <PenutupEvaluasi />
            </ProtectedRoute>
          }
        />

        {/* Dosen */}
        <Route
          path="/dashboardDosen"
          element={
            <ProtectedRoute role="dosen">
              <DashboardDosen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dataMahasiswa"
          element={
            <ProtectedRoute role="dosen">
              <DataMahasiswaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dataNilai"
          element={
            <ProtectedRoute role="dosen">
              <DataNilaiPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editMahasiswa/:id"
          element={
            <ProtectedRoute role="dosen">
              <EditUserPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
