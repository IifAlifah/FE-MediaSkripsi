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

const MateriMenghapusAtribut = () => {
    const description = (
        <>
        <Header title="Menghapus Atribut dengan removeAttribute()" />
        <p>
        Selain menambah atau mengubah atribut, kita juga bisa menghapus atribut dari suatu elemen menggunakan <b>removeAttribute()</b>. 
        Ini berguna untuk menghapus atribut yang tidak lagi diperlukan.
        </p>
        <KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>removeAttribute</title>
</head>
<body>
    
    <a id="link" href="https://example.com">Kunjungi situs</a>
    <script>
    var link = document.getElementById('link');
    link.removeAttribute("href"); 
    </script>

</body>
</html>`}
         runnable={true}
         editorId="editor1" 
        />
        <br></br>
        <p>Setelah menjalankan kode di atas, elemen <code>&lt;a&gt;</code> tidak lagi memiliki atribut <code>href</code>, 
        sehingga elemen tersebut tidak berfungsi sebagai tautan.</p>

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
          prevLink="/materi/mengubahAtribut" 
          nextLink="/materi/menambah_menghapus" 
        />
        </div>
      </div>
    </div>
  );
};

export default MateriMenghapusAtribut;
