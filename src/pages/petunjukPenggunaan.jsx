import { Link } from 'react-router-dom';
import petunjukBeranda from '../assets/petunjukBeranda.jpg';
import petunjukMateri from '../assets/petunjukMateri.jpg';
import petunjukEditor from '../assets/petunjukEditor.jpg';
import petunjukCodeEditor from '../assets/petunjukKodeEditor.jpg';
import petunjukAktivitas from '../assets/petunjukAktivitas.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PetunjukPenggunaan = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Konten Utama */}
      <main className="bg-light py-5" style={{ minHeight: '100vh', letterSpacing: "0.6px", fontSize: "1.1rem" }}>
        <div className="container-fluid px-3 px-md-5">
          <h2 className="text-center fw-bold text-primary mb-5">Panduan Penggunaan Media Pembelajaran</h2>

          <div className="accordion" id="accordionPetunjuk">

            {/* Halaman Beranda */}
            <div className="accordion-item mb-4 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <h2 className="accordion-header" id="headingBeranda">
                <button className="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBeranda" aria-expanded="true" aria-controls="collapseBeranda">
                  Halaman Beranda
                </button>
              </h2>
              <div id="collapseBeranda" className="accordion-collapse collapse show" aria-labelledby="headingBeranda" data-bs-parent="#accordionPetunjuk">
                <div className="accordion-body">
                  <img src={petunjukBeranda} alt="Beranda" className="img-fluid mx-auto mb-4 d-block" style={{ maxWidth: "80%", maxHeight: "600px", objectFit: "contain" }} />
                  <p className="fw-semibold mb-3">Petunjuk penggunaan pada halaman beranda:</p>
                    <ol className="text-start">
                        <li className="mb-3">
                            <b>Navigasi</b> berada di bagian atas halaman dan berfungsi untuk mengakses berbagai menu seperti <b>Editor</b>, <b>Petunjuk Penggunaan</b>, <b>Tentang</b>, <b>Daftar</b>, dan <b>Masuk</b>. Klik pada menu yang diinginkan untuk langsung menuju halaman tersebut.
                        </li>
                        <li className="mb-3">
                            Tombol <b>MULAI SEKARANG</b> untuk masuk ke media pembelajaran. Tombol ini akan membawa pengguna ke halaman <b>Login</b> atau <b>Masuk</b>, sebagai langkah awal untuk menggunakan fitur utama dari media pembelajaran. Pastikan Anda sudah memiliki akun terlebih dahulu.
                        </li>
                    </ol>
                </div>
              </div>
            </div>

            {/* Cara Mendaftar Akun */}
            <div className="accordion-item mb-4 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
            <h2 className="accordion-header" id="headingDaftar">
                <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDaftar" aria-expanded="false" aria-controls="collapseDaftar">
                Cara Mendaftar Akun
                </button>
            </h2>
            <div id="collapseDaftar" className="accordion-collapse collapse" aria-labelledby="headingDaftar" data-bs-parent="#accordionPetunjuk">
                <div className="accordion-body">
                <ol>
                    <li className="mb-3">
                        Klik menu <Link to="/register" className="text-decoration-none fw-bold text-primary">Daftar</Link> pada bagian atas halaman.
                    </li>

                    <li className="mb-3">Isi data diri dengan lengkap: <b>Nama Lengkap</b>, <b>Email</b>, <b>Kata Sandi</b>, dan <b>Konfirmasi Kata Sandi</b>.</li>
                    <li className="mb-3">Pilih <b>Role</b> Anda: apakah sebagai <b>Mahasiswa</b> atau <b>Dosen</b>.</li>
                    <li className="mb-3">
                    Jika Anda memilih <b>Mahasiswa</b>, maka:
                    <ul className="mt-2">
                        <li>Masukkan <b>NIM</b> Anda secara benar.</li>
                        <li>Masukkan <b>Token Kelas</b> yang diberikan oleh dosen untuk bergabung dalam kelas pembelajaran.</li>
                    </ul>
                    </li>
                    <li className="mb-3">
                    Jika Anda memilih <b>Dosen</b>, maka:
                    <ul className="mt-2">
                        <li>Masukkan <b>NIP</b> Anda dengan benar.</li>
                    </ul>
                    </li>
                    <li className="mb-3">Setelah semua data terisi dengan benar, klik tombol <b>Daftar</b> untuk menyelesaikan proses pendaftaran.</li>
                    <li className="mb-3">Jika berhasil, Anda akan diarahkan ke halaman login untuk masuk ke dalam sistem.</li>
                </ol>
                </div>
            </div>
            </div>


            {/* Halaman Materi */}
            <div className="accordion-item mb-4 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <h2 className="accordion-header" id="headingMateri">
                <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMateri" aria-expanded="false" aria-controls="collapseMateri">
                  Halaman Materi
                </button>
              </h2>
              <div id="collapseMateri" className="accordion-collapse collapse" aria-labelledby="headingMateri" data-bs-parent="#accordionPetunjuk">
                <div className="accordion-body">
                  <img src={petunjukMateri} alt="Materi" className="img-fluid mx-auto mb-4 d-block" style={{ maxWidth: "80%", maxHeight: "600px", objectFit: "contain" }} />
                  <p className="fw-semibold mb-3">Petunjuk penggunaan pada halaman materi:</p>
                  <ol className="text-start">
                        <li className="mb-3">
                            <b>Nama pengguna</b> tampil di kanan atas sebagai identitas. Saat Anda berhasil login, nama Anda akan muncul di bagian kanan atas halaman. Klik nama tersebut untuk mengakses menu <b>Keluar</b> jika ingin mengakhiri sesi pembelajaran.
                        </li>
                        <li className="mb-3">
                            <b>Sidebar materi</b> membantu navigasi antarmateri. Materi ditampilkan secara berurutan dan hanya bisa diakses jika aktivitas materi sebelumnya sudah diselesaikan.
                        </li>
                        <li className="mb-3">
                            Gunakan <b>tombol navigasi</b> untuk berpindah antar halaman materi. Klik tombol <b>Sebelumnya</b> untuk kembali ke materi sebelumnya, dan <b>Selanjutnya</b> untuk lanjut ke materi berikutnya.
                        </li>
                    </ol>
                    <hr className="my-4" /> 
                    <img src={petunjukAktivitas} alt="Materi" className="img-fluid mx-auto mb-4 d-block" style={{ maxWidth: "80%", maxHeight: "600px", objectFit: "contain" }} />
                    <ol className="text-start">
                            <li className="mb-3">
                                Setiap mengerjakan aktivitas pada materi, jika sudah selesai, klik tombol <b>Selesai</b> untuk menandai aktivitas tersebut telah dikerjakan.
                            </li>
                        </ol>
                </div>
              </div>
            </div>

            {/* Cara Penggunaan Kode Editor */}
            <div className="accordion-item mb-4 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <h2 className="accordion-header" id="headingEditor">
                <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEditor" aria-expanded="false" aria-controls="collapseEditor">
                  Cara Penggunaan Kode Editor
                </button>
              </h2>
              <div id="collapseEditor" className="accordion-collapse collapse" aria-labelledby="headingEditor" data-bs-parent="#accordionPetunjuk">
                <div className="accordion-body">
                <img src={petunjukCodeEditor} alt="Kode Editor Awal" className="img-fluid mx-auto mb-4 d-block" style={{ maxWidth: "80%", maxHeight: "600px", objectFit: "contain" }} />
                <p>Editor ini dapat diakses langsung tanpa perlu login, dan berada di halaman awal.</p>
                    <ol>
                    <li className="mb-3">
                        Terdapat tombol <b>Jalankan</b> untuk mengeksekusi kode yang Anda tulis dan melihat hasil outputnya, tombol <b>Reset</b> untuk membersihkan isi editor dan output yang muncul,
                        tombol <b>Simpan</b> berfungsi untuk menyimpan kode yang sudah ditulis, sehingga dapat digunakan kembali nanti dan tersedia juga tombol <b>Buka File</b> yang memungkinkan Anda membuka file dari perangkat Anda, lalu menjalankannya langsung di editor.
                    </li>
                    <li className="mb-3">
                        Tempat untuk mengetikkan kode.
                    </li>
                    <li className="mb-3">
                        Tempat untuk melihat hasil output dari kode yang telah dijalankan.
                    </li>
                    </ol>

                    <hr className="my-4" /> 

                <img src={petunjukEditor} alt="Kode Editor Materi" className="img-fluid mx-auto mb-4 d-block" style={{ maxWidth: "80%", maxHeight: "600px", objectFit: "contain" }} />
                <p>Editor ini berada di halaman materi dan hanya dapat diakses setelah login.</p>
                    <ol>
                    <li className="mb-3">
                        Tempat kode yang sudah disediakan oleh sistem. Anda dapat mengedit kode ini sesuai dengan kebutuhan pembelajaran.
                    </li>
                    <li className="mb-3">
                        Terdapat tombol <b>Jalankan</b> untuk menjalankan kode yang tersedia, tombol <b>Reset</b> jika ingin mengembalikan kode ke kondisi awal atau default yang disediakan sistem dan tombol <b>Hapus</b> digunakan untuk membersihkan output yang muncul tanpa mengubah isi kode.
                    </li>
                    <li className="mb-3">
                        Tempat untuk melihat hasil output dari kode yang telah dijalankan. Output ini akan muncul setelah Anda menekan tombol <b>Jalankan</b>.
                    </li>
                    </ol>

                </div>
              </div>
            </div>

            {/* Hubungi Kami */}
            <div className="accordion-item mb-4 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <h2 className="accordion-header" id="headingHubungi">
                <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseHubungi" aria-expanded="false" aria-controls="collapseHubungi">
                  Hubungi Kami
                </button>
              </h2>
              <div id="collapseHubungi" className="accordion-collapse collapse" aria-labelledby="headingHubungi" data-bs-parent="#accordionPetunjuk">
                <div className="accordion-body">
                  <p>Jika mengalami kendala atau memiliki pertanyaan lebih lanjut, silakan hubungi kami melalui:</p>
                  <ul>
                    <li>Email: <a href="mailto:iifalifah11@gmail.com.com">iifalifah11@gmail.com</a></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default PetunjukPenggunaan;
