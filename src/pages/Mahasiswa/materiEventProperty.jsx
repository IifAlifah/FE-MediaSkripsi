import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import menuDataMateri from "../../data/menu/menuDataMateri";
import Gambar from "../../components/tambahGambar";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import Header from "../../components/header";
import KodeEditor from "../../components/kodeEditor.jsx";
import NavButton from "../../components/navButton.jsx";

const MateriEventProperty = () => {
    const description = (
        <>
        <Header title="Menghentikan Perambatan Event dengan stopPropagation()" />
        <p>
        Selain addEventListener(), kita juga bisa menggunakan properti event pada 
        elemen, seperti onclick, onmouseover, atau onkeyup, untuk menetapkan event handler.
        </p>
        <KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Handler Property</title>
</head>
<body>
    <button id="myButton">Klik saya</button>

    <script>
    var button = document.getElementById('myButton');
    button.onclick = function() {
        alert("Tombol diklik!");
    };
    </script>

</body>
</html>`}
         runnable={true}
         editorId="editor1" 
        />
        <br></br>
        <p>Pada contoh di atas, kita menggunakan properti <code>event onclick</code> 
        pada elemen untuk menetapkan event handler. Elemen dengan <code>id="myButton"</code> 
        diakses menggunakan <code>getElementById</code>, dan kemudian event handler ditetapkan 
        dengan menggunakan properti <code>onclick</code>.</p>

        <p>Ketika tombol diklik, fungsi yang telah ditetapkan akan dijalankan, 
            menghasilkan pesan alert <strong>"Tombol diklik!"</strong>.</p>

        </>
    );
  const aktivitas = (
    <>
    <GambarAktivitas
        src="/aktivitas.png" 
        alt="Aktivitas" 
    />
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
            prevLink="/materi/eventInline" 
            nextLink="/materi/menghentikanEventBawaan" 
          />
        </div>
      </div>
    </div>
  );
};

export default MateriEventProperty;
