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

const MateriMenambahkanEvent = () => {
    const description = (
        <>
        <Header title="2.	Menambahkan Event Listener dengan addEventListener()" />
        <p>Metode <code>addEventListener()</code> adalah cara umum untuk menangani event di DOM. 
        Metode ini memungkinkan kita untuk menetapkan event handler pada suatu elemen tanpa mengubah struktur HTML.</p>
        <p><strong>Format:</strong> <code>element.addEventListener(event, function);</code></p>

        <KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>addEventListener()</title>
</head>
<body>
    <button id="myButton">Klik saya</button>

    <script>
    var button = document.getElementById('myButton');
    button.addEventListener("click", function() {
        alert("Tombol diklik!");
    });
    </script>
</body>
</html>`}
         runnable={true}
         editorId="editor1" 
        />
        <br></br>
        <p>Pada contoh di atas, metode <code>addEventListener()</code> digunakan untuk menetapkan 
        event handler pada tombol dengan id <code>myButton</code>. Event yang ditetapkan adalah <code>click</code>, 
        dan fungsi yang dieksekusi akan menampilkan pesan alert <code>"Tombol diklik!"</code> setiap kali tombol diklik.</p>


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
          <AktivitasBox 
          aktivitas={aktivitas}
          />
          <NavButton 
            prevLink="/materi/mengenalEvent" 
            nextLink="/materi/eventInline" 
          />
        </div>
      </div>
    </div>
  );
};

export default MateriMenambahkanEvent;
