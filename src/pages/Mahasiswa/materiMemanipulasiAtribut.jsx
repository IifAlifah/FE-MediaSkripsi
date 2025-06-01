import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import Header from "../../components/header";
import KodeEditor from "../../components/kodeEditor.jsx";
import Isian from "../../components/isian.jsx";
import questions from "../../data/AktivitasManipulasi/MemanipulasiElemenAtribut.json";
import Instruksi from "../../components/instruksi.jsx";
import axios from "axios";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import TujuanPembelajaran from "../../components/tujuanPembelajaran.jsx";

const MateriMemanipulasiAtributElemen = () => {
    const [progress, setProgress] = useState(0);
    const [halamanAktif, setHalamanAktif] = useState(11); // halaman saat ini
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
          <li>Memahami dan menerapkan cara memanipulasi atribut elemen HTML menggunakan JavaScript.</li>
        </ul>
        </>
    )
        
    const materiContent1 = (
        <>
        <Header title="Memanipulasi Atribut Elemen" />
       <p>
        Dalam HTML, elemen seperti <code>&lt;img&gt;</code>, <code>&lt;a&gt;</code>, atau <code>&lt;input&gt;</code> memiliki atribut seperti <code>src</code>, <code>href</code>, dan <code>value</code>. 
        Ketika halaman dimuat, elemen-elemen ini menjadi objek di dalam DOM (Document Object Model). 
        Dalam JavaScript, kita dapat menambah, mengubah, atau menghapus atribut HTML pada elemen tertentu.
        </p>
        </>
    );

    const materiContent2 = (
        <>
        <p>
        1. <strong>Menggunakan metode <code>setAttribute()</code></strong><br></br>
        Metode <code>setAttribute()</code> memungkinkan kita untuk menambah atau mengubah nilai atribut elemen HTML, termasuk atribut standar seperti <code>src</code>, <code>href</code>, dan atribut khusus seperti <code>data-*</code>, <code>aria-*</code>, dan atribut kustom lainnya.
        </p>

        <p>
        <strong>Sintaks umum:</strong><br></br>
        <code>element.setAttribute(attributeName, value);</code>
        </p>


        <KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<body>
    <a id="tautan" href="https://www.w3schools.com/" target="_blank">Kunjungi Halaman</a>
    <button onclick="ubahTautan()">Klik untuk ubah</button>

    <script>
    function ubahTautan() {
        var link = document.getElementById("tautan");
        link.setAttribute("href", "https://openai.com");
        link.textContent = "Kunjungi OpenAI";
    }
</script>
</body>
</html>`}
         runnable={true}
         editorId="editor1" 
        />
        <br></br>
        <p>
            Saat halaman web dimuat, elemen <code>&lt;a&gt;</code> dengan atribut <code>id="tautan"</code> memiliki <code>href="https://www.w3schools.com/"</code> dan <code>target="_blank"</code>, sehingga saat diklik akan membuka halaman W3Schools di tab baru. Teks tautan yang ditampilkan adalah <b>"Kunjungi Halaman"</b>.
        </p>
        <p>
            Di bawahnya terdapat tombol <b>"Klik untuk ubah"</b>. Tombol ini memiliki atribut <code>onclick</code> yang akan menjalankan fungsi JavaScript bernama <code>ubahTautan()</code> saat diklik.
        </p>
        <p>
            Di dalam fungsi <code>ubahTautan()</code>, elemen dengan <code>id="tautan"</code> diakses menggunakan method <code>document.getElementById()</code>. Kemudian, atribut <code>href</code> diubah menggunakan method <code>setAttribute()</code> menjadi <code>"https://openai.com"</code>, dan teks tautan diubah menggunakan properti <code>textContent</code> menjadi <b>"Kunjungi OpenAI"</b>. Dengan demikian, tautan akan menuju situs OpenAI dan menampilkan teks yang sesuai.
        </p>

        </>
    );

    const materiContent3 = (
        <>
       <p>
        2. <strong>Menggunakan penulisan langsung</strong><br></br>
       </p>
       <p>
        Selain <code>setAttribute()</code>, kita juga bisa menggunakan penulisan langsung untuk mengubah atribut tertentu. 
        Ini merupakan cara yang lebih ringkas dan langsung, tetapi hanya berlaku untuk atribut yang dikenali sebagai properti DOM.
        </p>

        <p>
        <strong>Sintaks umum:</strong><br></br>
        <code>element.attributeName = value;</code>
        </p>
        <p>Perhatikan kode di bawah ini!</p>
        <KodeEditor
        key="editor2"
        code={`<!DOCTYPE html>
<html lang="en">
<body>
   <a id="tautan" href="https://www.w3schools.com/" target="_blank">Kunjungi Halaman</a>
    <button onclick="ubahTautan()">Klik untuk ubah</button>

    <script>
    function ubahTautan() {
        document.getElementById("tautan").href = "https://openai.com";
    }
</script>
</body>
</html>`}
         runnable={true}
         editorId="editor2" 
        />
        <br></br>
       <p>
            Saat halaman web dimuat, elemen <code>&lt;a&gt;</code> dengan atribut <code>id="tautan"</code> memiliki <code>href="https://www.w3schools.com/"</code> dan <code>target="_blank"</code>, sehingga ketika diklik akan membuka halaman W3Schools di tab baru. Teks yang ditampilkan oleh tautan tersebut adalah <b>"Kunjungi Halaman"</b>.
        </p>
        <p>
            Di bawahnya terdapat tombol <b>"Klik untuk ubah"</b>. Tombol ini memiliki atribut <code>onclick</code> yang akan menjalankan fungsi JavaScript bernama <code>ubahTautan()</code> saat tombol diklik.
        </p>
        <p>
            Di dalam fungsi <code>ubahTautan()</code>, elemen dengan <code>id="tautan"</code> diakses menggunakan method <code>document.getElementById()</code>. Lalu, atribut <code>href</code> dari elemen tersebut diubah langsung dengan penugasan properti, yaitu <code>element.href = "https://openai.com"</code>. Dengan cara ini, tautan akan mengarah ke situs OpenAI ketika pengguna mengkliknya.
        </p>

        </>
    );

    const materiContent4 = (
        <>
        <p>
        3. <strong>Menghapus Atribut</strong><br></br>
        <p>
        Untuk menghapus atribut dari suatu elemen HTML, kita bisa menggunakan metode <code>removeAttribute()</code>. 
        Ini berguna ketika kita ingin menghilangkan suatu atribut yang tidak lagi diperlukan, sehingga elemen akan 
        kehilangan perilaku yang terkait dengan atribut tersebut.
        </p>

        </p>

        <p>
        <strong>Sintaks umum:</strong><br></br>
        <code>element.removeAttribute(attributeName);</code>
        </p>
        <p>Perhatikan kode di bawah ini!</p>
  <KodeEditor
        key="editor3"
        code={`<!DOCTYPE html>
<html lang="en">
<body>
    <a id="link" href="https://example.com">Kunjungi situs</a>
    <script>
    var link = document.getElementById("link");
    link.removeAttribute("href"); 
    </script>
</body>
</html>`}
         runnable={true}
         editorId="editor3" 
        />
        <br></br>
        <p>
  Setelah menjalankan kode di atas, elemen <code>&lt;a&gt;</code> tidak lagi memiliki atribut <code>href</code>, 
  sehingga elemen tersebut tidak berfungsi sebagai tautan.
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
        <AktivitasBox aktivitas={<TujuanPembelajaran tujuan={tujuanBelajar} />} />  
        <AktivitasBox aktivitas={<Materi description={materiContent1} />} />  
        <AktivitasBox aktivitas={<Materi description={materiContent2} />} />
        <AktivitasBox aktivitas={<Materi description={materiContent3} />} />
        <AktivitasBox aktivitas={<Materi description={materiContent4} />} />  
        <AktivitasBox aktivitas={aktivitas} />
        <div className="d-flex justify-content-between ms-4 me-4 mt-5">
          {/* Tombol Sebelumnya */}
          <button
            onClick={() => navigate("/materi/mengubahKonten")}
            className="btn btn-secondary"
          >
            Sebelumnya
          </button>

          {/* Tombol Selanjutnya */}
          <button
            onClick={() => navigate("/materi/menambah_menghapus")}
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

export default MateriMemanipulasiAtributElemen;
