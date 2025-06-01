import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import Header from "../../components/header";
import KodeEditor from "../../components/kodeEditor.jsx";
import Isian from "../../components/isian.jsx";
import Instruksi from "../../components/instruksi.jsx";
import questions from "../../data/AktivitasEventDom/MenanganiEvent.json"; // Pastikan path ini sesuai dengan struktur folder Anda
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import TujuanPembelajaran from "../../components/tujuanPembelajaran.jsx";

const MateriMenanganiEventDom = () => {
    const [progress, setProgress] = useState(0);
    const [halamanAktif, setHalamanAktif] = useState(16); // halaman saat ini
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const updateProgress = async () => {
    try {
        const response = await axios.patch(
        "http://localhost:5000/progress/update",
        {}, // bisa ditambah body kalau backend butuh nilai progress tertentu
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        if (response.status === 200) {
        console.log("Progress berhasil diperbarui");

        // ✅ Update state progress secara lokal
        const newProgress = halamanAktif + 1; // atau sesuai dengan logika kamu
        setProgress(newProgress);
        }
    } catch (error) {
        console.error("Gagal update progress:", error);
    }
    };

  useEffect(() => {
    // Fetch progress dari backend saat komponen mount
    const fetchProgress = async () => {
      const response = await fetch("http://localhost:5000/progress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProgress(data.progress); // update state
    };
    fetchProgress();
  }, []);

   const handleIsianSuccess = () => {
      if (halamanAktif >= progress) {
        updateProgress(halamanAktif); // ✅ hanya update kalau belum pernah
      } else {
        console.log("Progress tidak diupdate karena sudah pernah diselesaikan.");
      }
    };

     const tujuanBelajar = (
        <>
        <p>Setelah selesai mempelajari materi ini, diharapkan kamu akan mampu untuk:</p>
        <ul>
          <li>Memahami konsep penanganan event di DOM serta menerapkan masing-masing metode</li>
        </ul>
        </>
    );

    const materiContent = (
        <>
        <Header title="Menangani Event DOM" />
        
        <p>
        Dalam JavaScript, <strong>event</strong> adalah peristiwa yang terjadi di halaman web, seperti pengguna 
        mengklik tombol, menggerakkan mouse, atau menekan tombol keyboard. Untuk membuat halaman web yang interaktif, 
        kita perlu menangani event tersebut dengan menetapkan <strong>event handler</strong>, yaitu fungsi yang dijalankan 
        saat event terjadi.
        </p>

        <p>
        Ada beberapa cara untuk menangani event dalam DOM, dan semuanya dapat digunakan tergantung pada kebutuhan. 
        Namun, sebaiknya kita memahami perbedaan antar cara tersebut agar dapat memilih metode yang tepat.
        </p>

        </>
    );  

    const materiContent1 = (
        <>
        <ul>
          <li><strong>Penanganan Event dengan Atribut HTML (Inline Event Handler)</strong></li>
        </ul>

        <p>
        Cara paling sederhana menangani event adalah dengan menambahkan event handler langsung di atribut HTML.
        Metode ini disebut <strong>event handler inline</strong>.
        </p>

        <p>Perhatikan kode di bawah ini!</p>
         <KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<body>
    <button onclick="alert('Tombol diklik!')">Klik saya</button>
</body>
</html>`}
         runnable={true}
         editorId="editor1" 
        />
        <br></br>
        <p>Pada contoh di atas, kita menambahkan event handler <code>onclick</code> langsung di dalam elemen button.
        Ketika tombol tersebut diklik, fungsi <code>alert()</code> akan dijalankan dan menampilkan pesan <code>"Tombol diklik!"</code>.</p>         
        <p>
        Metode ini mudah dipahami dan cepat digunakan, namun <strong>tidak disarankan dalam proyek yang lebih besar</strong> karena mencampurkan HTML dan JavaScript akan membuat kode sulit dibaca dan dipelihara.
        </p>

        </>
        );

    const materiContent2 = (
        <>
        <ul>
          <li><strong>Penanganan Event dengan Properti Event</strong></li>
        </ul>
        <p>
        Cara berikutnya adalah menetapkan event handler menggunakan properti event pada elemen HTML yang diakses melalui JavaScript, misalnya onclick, onmouseover, dan sebagainya.
        </p>

        <p>Perhatikan kode di bawah ini!</p>
         <KodeEditor
        key="editor2"
        code={`<!DOCTYPE html>
<html lang="en">
<body>
    <button id="myButton">Klik saya</button>
    <script>
    var button = document.getElementById("myButton");
    button.onclick = function() {
        alert("Tombol diklik!");
    };
    </script>
</body>
</html>`}
         runnable={true}
         editorId="editor2" 
        />
        <br></br>
        <p>
        Pada contoh di atas, kita menggunakan properti event <code>onclick</code> pada elemen untuk menetapkan event handler. Elemen dengan <code>id="myButton"</code> diakses menggunakan <code>getElementById</code>, dan kemudian event handler ditetapkan dengan menggunakan properti <code>onclick</code>. Ketika tombol diklik, fungsi yang telah ditetapkan akan dijalankan, menghasilkan pesan <code>alert("Tombol diklik!")</code>.
        </p>

        <p>
        Namun, perlu diingat bahwa cara ini hanya memungkinkan <strong>satu event handler</strong> untuk satu jenis event pada satu elemen. Jika kita menetapkan handler baru, handler yang lama akan digantikan.
        </p>
        </>
        );
    
    const materiContent3 = (
        <>
        <ul>
          <li><strong>Penanganan Event dengan addEventListener()</strong></li>
        </ul>
        <p>
        Metode <code>addEventListener()</code> adalah cara umum untuk menangani event di DOM. Metode ini memungkinkan kita untuk menetapkan event handler pada suatu elemen tanpa mengubah struktur HTML.
        </p>

        <p>Perhatikan kode di bawah ini!</p>
         <KodeEditor
        key="editor3"
        code={`<!DOCTYPE html>
<html lang="en">
<body>
    <button id="myButton">Klik saya</button>
    <script>
    var button = document.getElementById("myButton");
    button.addEventListener("click", function() {
        alert("Tombol diklik!");
    });
    </script>
</body>
</html>`}
         runnable={true}
         editorId="editor3" 
        />
        <br></br>
        <p>
        Pada contoh di atas, metode <code>addEventListener()</code> digunakan untuk menetapkan event handler pada tombol dengan id <code>myButton</code>. 
        Event yang ditetapkan adalah <code>"click"</code>, dan fungsi yang dieksekusi akan menampilkan pesan alert <strong>"Tombol diklik!"</strong> setiap kali tombol diklik.
        </p>
        </>
    );

        const materiContent4 = (
        <>
        <ul>
          <li><strong>Penghapusan Event</strong></li>
        </ul>

        <p>
        Jika kita tidak lagi membutuhkan suatu event, kita bisa menghapusnya menggunakan <code>removeEventListener()</code>. <code>removeEventListener()</code> adalah metode di JavaScript yang digunakan untuk menghapus event handler 
        yang sebelumnya telah ditetapkan dengan <code>addEventListener()</code>.
        </p>

        <p>Perhatikan kode di bawah ini!</p>
         <KodeEditor
        key="editor4"
        code={`<!DOCTYPE html>
<html lang="en">
<body>
   <button id="myButton">Klik saya sekali</button>
    <script>
        function handleClick() {
            alert("Tombol diklik!");
            button.removeEventListener("click", handleClick);
        }
        var button = document.getElementById("myButton");
        button.addEventListener("click", handleClick);
    </script>
</body>
</html>`}
         runnable={true}
         editorId="editor4" 
        />
        <br></br>
       <p>
        Pada awalnya, event listener dengan fungsi <code>handleClick</code> ditambahkan ke elemen tombol dengan id <code>myButton</code> menggunakan <code>addEventListener()</code>. 
        Saat tombol diklik, fungsi <code>handleClick</code> akan dijalankan, yang menampilkan pesan "Tombol diklik!" melalui <code>alert()</code>.
        </p>

        <p>
        Setelah itu, di dalam fungsi yang sama, <code>removeEventListener()</code> dipanggil untuk menghapus event listener tersebut. 
        Akibatnya, event handler hanya berjalan satu kali saja, klik berikutnya tidak akan memicu aksi apa pun lagi.
        </p>

        </>
        );
 const instruksi = (
    <>  
      <p><b>Instruksi:</b></p>
      <ol>
        <li>Amati dan pahami potongan kode HTML atau JavaScript yang disediakan.</li>
        <li>Tuliskan jawaban dengan tepat sesuai aturan penulisan JavaScript atau HTML.</li>
        <li>Perhatikan penulisan huruf besar dan kecil (case sensitive)</li>
      </ol>
      </>
  );  

    const aktivitas = (
      <>
        <GambarAktivitas
            src="/aktivitas.png" 
            alt="Aktivitas" 
        />
        <Instruksi aktivitas ={instruksi}/>
        <div className="section-kuis ms-4 me-4">
          <p>Kerjakan soal-soal berikut ini!</p>

          <Isian questions={questions} onSuccess={handleIsianSuccess}/>
        </div>
      </>
    );

  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <div className="sidebar-wrapper" >
          <SidebarMahasiswa />
        </div>
        <div className="main-content">
          <AktivitasBox aktivitas={<TujuanPembelajaran tujuan={tujuanBelajar}/>} />
          <AktivitasBox aktivitas={<Materi description={materiContent} />} />
          <AktivitasBox aktivitas={<Materi description={materiContent1} />} />
          <AktivitasBox aktivitas={<Materi description={materiContent2} />} />
          <AktivitasBox aktivitas={<Materi description={materiContent3} />} />
          <AktivitasBox aktivitas={<Materi description={materiContent4} />} />
          <AktivitasBox 
          aktivitas={aktivitas}
          />
         <div className="d-flex justify-content-between ms-4 me-4 mt-5">
          {/* Tombol Sebelumnya */}
          <button
            onClick={() => navigate("/materi/mengenalEvent")}
            className="btn btn-secondary"
          >
            Sebelumnya
          </button>

          {/* Tombol Selanjutnya */}
          <button
            onClick={() => navigate("/materi/menghentikanEventBawaan")}
            className="btn btn-warning text-white"
            disabled={progress <= halamanAktif}
          >
            Selanjutnya
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MateriMenanganiEventDom;
