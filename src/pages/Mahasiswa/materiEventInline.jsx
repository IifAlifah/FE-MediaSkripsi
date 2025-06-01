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

const MateriEventInline = () => {
    const description = (
        <>
        <Header title="Menggunakan Event Handler Inline" />
        <p>
        Cara lain untuk menangani event adalah dengan menambahkan event handler langsung di atribut HTML. 
        Metode ini disebut event handler inline. Namun, cara ini kurang disarankan karena bercampurnya kode 
        HTML dan JavaScript dapat mengurangi keterbacaan kode.
        </p>
        <KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>inline </title>
</head>
<body>
    <button onclick="alert('Tombol diklik!')">Klik saya</button>

</body>
</html>`}
         runnable={true}
         editorId="editor1" 
        />
        <br></br>
        <p>Dalam contoh di atas, atribut <code>onclick</code> pada elemen <code>&lt;button&gt;</code> 
        diisi dengan kode JavaScript sederhana, yaitu <code>alert('Tombol diklik!')</code>.</p>

        <p>Ketika tombol diklik, fungsi <code>alert</code> akan dijalankan, dan pesan <strong>"Tombol diklik!"</strong> 
        akan muncul. Cara ini mirip dengan penggunaan <code>addEventListener()</code>, tetapi event handler diatur langsung 
        di dalam atribut HTML.</p>

        </>
    );
  const aktivitas = (
    <>
    <p>Perhatikan susunan file html dibawah ini!</p>
    <Gambar
        src="/gambar/aktivitas1.png" 
        alt="Aktivitas 1" 
        containerStyle={{ textAlign: "center", width: "50%" }}
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
          <AktivitasBox 
            aktivitas={aktivitas}
            currentQuestion={1} 
            totalQuestions={10} 
          />
          <NavButton 
            prevLink="/materi/menambahkanEvent" 
            nextLink="/materi/eventProperty" 
          />
        </div>
      </div>
    </div>
  );
};

export default MateriEventInline;
