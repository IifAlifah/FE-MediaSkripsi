import Sidebar from "../../components/sidebar";
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import menuDataMateri from "../../data/menu/menuDataMateri";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import Header from "../../components/header";
import KodeEditor from "../../components/kodeEditor.jsx";
import NavButton from "../../components/navButton.jsx";
import Isian from "../../components/isian.jsx";
import questions from "../../data/AktivitasManipulasi/MemanipulasiElemenAtribut.json";

const MateriMengubahAtribut = () => {
    const description = (
        <>
        <Header title="Mengubah Atribut Elemen dengan setAttribute()" />
        <p>
        Metode setAttribute() memungkinkan kita untuk menambah atau mengubah nilai atribut elemen HTML, 
        seperti src pada gambar atau href pada tautan.
        </p>
        <KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>setAttribute</title>
</head>
<body>
    
    <img id="logo" src="logo_awal.png" alt="Logo">
    <script>
      var logo = document.getElementById('logo');
      logo.setAttribute("src", "logo.png"); 
    </script>

</body>
</html>`}
         runnable={true}
         editorId="editor1" 
        />
        <br></br>
        <p>Pada contoh di atas, <code>setAttribute()</code> digunakan untuk mengganti nilai atribut 
        <code> src</code> pada elemen gambar dengan gambar baru bernama logo.png.</p>


        </>
    );
  const aktivitas = (
    <>
    <GambarAktivitas
        src="/aktivitas.png" 
        alt="Aktivitas" 
    />
    <Isian questions={questions} />
    </>
  );

  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <div className="sidebar-wrapper" >
          <Sidebar menuData={menuDataMateri} />
        </div>
        <div className="main-content">
        <AktivitasBox aktivitas={<Materi description={description} />} />  
        <AktivitasBox aktivitas={aktivitas} />
          <NavButton 
            prevLink="/materi/mengubahKonten" 
            nextLink="/materi/menghapusAtribut" 
          />
        </div>
      </div>
    </div>
  );
};

export default MateriMengubahAtribut;
