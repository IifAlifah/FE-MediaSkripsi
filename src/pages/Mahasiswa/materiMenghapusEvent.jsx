import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import menuDataMateri from "../../data/menu/menuDataMateri";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import Header from "../../components/header";
import KodeEditor from "../../components/kodeEditor.jsx";
import NavButton from "../../components/navButton.jsx";

const MateriMenghapusEvent = () => {
    const description = (
        <>
        <Header title="Menghapus Event Listener dengan removeEventListener()" />
        <p>
        Jika kita tidak lagi membutuhkan suatu event, kita bisa menghapusnya menggunakan removeEventListener().
        </p>
        <KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>removeEventListener</title>
</head>
<body>
    <button id="myButton">Klik saya</button>

    <script>
    function showAlert() {
        alert("Tombol diklik!");
    }

    var button = document.getElementById('myButton');
    button.addEventListener("click", showAlert);

    setTimeout(function() {
        button.removeEventListener("click", showAlert);
    }, 3000);
    </script>

</body>
</html>`}
         runnable={true}
         editorId="editor1" 
        />
        <br></br>
        <p>Kode di atas menunjukkan cara menggunakan metode <code>removeEventListener()</code> untuk menghapus 
        event listener yang sebelumnya ditambahkan dengan <code>addEventListener()</code>.</p>

        <p>Pada awalnya, sebuah event listener dengan fungsi <code>showAlert</code> ditambahkan ke elemen tombol
         dengan id <code>myButton</code>. Fungsi ini akan menampilkan pesan "Tombol diklik!" saat tombol tersebut 
         diklik. Namun, setelah 3 detik (3000 milidetik), event listener ini dihapus menggunakan <code>removeEventListener()</code>, 
         sehingga tombol tidak lagi merespons klik dengan menampilkan pesan.</p>

        <p>Ini menunjukkan bagaimana kita dapat mengontrol kapan event listener aktif dan kapan harus dihapus, 
            memungkinkan pengelolaan event yang lebih fleksibel dan efisien.</p>

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
            prevLink="/materi/perambatanEvent" 
            nextLink="/materi/kuis4" 
          />
        </div>
      </div>
    </div>
  );
};

export default MateriMenghapusEvent;
