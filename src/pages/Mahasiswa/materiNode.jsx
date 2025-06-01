import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import TujuanPembelajaran from "../../components/tujuanPembelajaran";
import Gambar from "../../components/tambahGambar";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import DragDropActivity from "../../components/dragNdrop.jsx";
import Header from "../../components/header.jsx";
import axios from "axios";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import ModalPetunjukKuis from "../../components/modalPetunjukKuisPilgan.jsx";

const MateriNode = () => {
  const [showModal, setShowModal] = useState(false); 
  const [progress, setProgress] = useState(0);
  const [halamanAktif, setHalamanAktif] = useState(2); // halaman saat ini
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

    // Tambahkan fungsi ini di dalam MateriNode
    const handleDragDropSuccess = () => {
      if (halamanAktif >= progress) {
        updateProgress(halamanAktif); // ✅ hanya update kalau belum pernah
      } else {
        console.log("Progress tidak diupdate karena sudah pernah diselesaikan.");
      }
    };

    const handleNextClick = () => {
      setShowModal(true);
    };

    const tujuanBelajar = (
    <>
      <p>Setelah mempelajari materi ini, diharapkan kamu akan mampu untuk:</p>
      <ul>
          <li>Mengenali jenis Nodes dalam DOM</li>
      </ul>
    </>
  );


  const description = (
    <>
      <Header title="Node" />
      <p>
      Dalam DOM, setiap elemen pada halaman web diwakili oleh sebuah <b>node</b>. <b>Node</b> adalah unit dasar dalam struktur DOM yang merepresentasikan 
      bagian dari dokumen HTML. Ada berbagai jenis node yang dapat dimanipulasi dengan JavaScript, dan masing-masing memiliki fungsi dan karakteristik yang 
      berbeda. Secara garis besar, node terbagi menjadi beberapa kategori berikut:
      </p>
    
      <ul>
        <li>Elemen Node</li>
            <p>
            <b>Elemen node</b> adalah node yang mewakili elemen-elemen HTML dalam sebuah dokumen. Setiap elemen HTML, seperti &lt;div&gt;, &lt;p&gt;, &lt;a&gt;, dan lainnya, 
            direpresentasikan sebagai elemen node di dalam DOM. Elemen-elemen ini bisa diakses dan dimodifikasi dengan menggunakan berbagai metode DOM, 
            seperti getElementById(), getElementsByClassName(), atau querySelector().
            </p>
             <Gambar
                src="/gambar/gambar1_5.png" 
                alt="Text Node" 
                caption="Gambar 1.5 Contoh elemen node" 
            />
            <p>Pada kode di atas, tag <code>&lt;p&gt;</code> merupakan elemen node. 
            Elemen seperti <code>&lt;p&gt;</code> dapat memiliki atribut, teks, atau bahkan elemen lain di dalamnya.
            </p>
            
        <li>Teks Nodes</li>
            <p>
            Setiap teks yang muncul di dalam elemen HTML diwakili oleh text node di dalam DOM. <b>Text nodes</b> adalah bagian dari DOM yang menyimpan konten teks 
            dalam elemen HTML. Meskipun teks ini berada di dalam elemen HTML (misalnya di dalam &lt;p&gt; atau &lt;div&gt;), teks tersebut tetap diperlakukan sebagai node 
            tersendiri. Untuk mengakses dan memodifikasi konten teks, kita bisa menggunakan properti seperti textContent. Sebagai contoh perhatikan code dibawah ini 
             <Gambar
                src="/gambar/gambar1_5.png" 
                alt="Text Node" 
                caption="Gambar 1.6 Contoh teks node" 
            />
            </p>
            <p>Pada code diatas, "Belajar DOM Javascript" merupakan teks node.
            Teks node selalu menjadi bagian dari node elemen, karena ia berada di dalam suatu elemen HTML. 
            </p>
       
        <li>Atribut Node</li>
            <p>
            <b>Atribut</b> digunakan untuk memberikan informasi yang lebih spesifik tentang suatu elemen. Atribut dapat diterapkan pada berbagai elemen untuk menjelaskan isi elemen tersebut dengan lebih rinci. Sebagai contoh perhatikan code dibawah ini 
            <Gambar
                src="/gambar/gambar1_5.png" 
                alt="Atribut Node" 
                caption="Gambar 1.7 Contoh atribut node" 
            />
             <p>
            Pada Pada code diatas, title="description" dianggap sebagai node atribut. Karena atribut selalu berada di dalam tag pembuka dan node atribut selalu menjadi bagian dari 
            node elemen. 
            </p>
            </p>
      </ul>
    </>
  );

  const aktivitas = (
    <>
    <GambarAktivitas
        src="/aktivitas.png" 
        alt="Aktivitas" 
    />
    <DragDropActivity onSuccess={handleDragDropSuccess} />
    
    </>
  );

  return (
    <div>
      <Navbar />
      <div className="d-flex">
        {!showModal && (
          <div className="sidebar">
            <SidebarMahasiswa />
          </div>
        )}
        <div className="main-content">
           <AktivitasBox
            aktivitas={

              <>
                <TujuanPembelajaran tujuan={tujuanBelajar} />
              </>
            }
          />
          <AktivitasBox aktivitas={<Materi description={description} />} />  
          <AktivitasBox 
          aktivitas={aktivitas}
          />

           <ModalPetunjukKuis
              show={showModal}
              onClose={() => setShowModal(false)}
              bab="Pendahuluan"
              kuis={1}
              routeMulai="/kuis2"
            />
          <div className="d-flex justify-content-between ms-4 me-4 mt-5">
            {/* Tombol Sebelumnya */}
            <button
              onClick={() => navigate("/materi/domTree")}
              className="btn btn-secondary"
            >
              Sebelumnya
            </button>

            {/* Tombol Selanjutnya */}
            <button
              onClick={handleNextClick}
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

export default MateriNode;
