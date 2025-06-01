const menuDataMateri = [
  {
    title: "Dashboard",
    to: "/dashboard",
    halaman: 0, // misal halaman 0 untuk dashboard
  },
  {
    title: "Pengenalan Object",
    links: [
      { id: 1, title: "Pengenalan Object", to: "/materi/materiPengenalanObject", halaman: 1 },
      { id: 2, title: "Kuis 1", to: "/kuis1", halaman: 2 },
    ],
  },
  {
    title: "Pengenalan DOM HTML",
    links: [
      { id: 3, title: "Apa itu DOM", to: "/materi/materiDom", halaman: 3 },
      { id: 4, title: "DOM TREE", to: "/materi/domTree", halaman: 4 },
      { id: 5, title: "Node", to: "/materi/node", halaman: 5 },
      { id: 6, title: "Metode dan Properti DOM", to: "/materi/metode-properti", halaman: 6 },
      { id: 7, title: "Kuis 2", to: "/kuis2", halaman: 7 },
    ],
  },
  {
    title: "Mengakses Elemen",
    links: [
      { id: 8, title: "getElementById", to: "/materi/id", halaman: 8 },
      { id: 9, title: "getElementByTagName", to: "/materi/tagname", halaman: 9 },
      { id: 10, title: "getElementByClassName", to: "/materi/classname", halaman: 10 },
      { id: 11, title: "querySelector dan querySelectorAll", to: "/materi/querySelector", halaman: 11 },
      { id: 12, title: "Node Traversing", to: "/materi/nodeTraversing", halaman: 12 },
      { id: 13, title: "Kuis 3", to: "/kuis3", halaman: 13 },
    ],
  },
  {
    title: "Manipulasi Konten",
    links: [
      { id: 14, title: "Mengubah Konten", to: "/materi/mengubahKonten", halaman: 14 },
      { id: 15, title: "Memanipulasi Atribut Elemen", to: "/materi/memanipulasiAtributElemen", halaman: 15 },
      { id: 16, title: "Menambah dan Menghapus Elemen", to: "/materi/menambah_menghapus", halaman: 16 },
      { id: 17, title: "Mengubah Gaya(CSS) Elemen", to: "/materi/mengubahCss", halaman: 17 },
      { id: 18, title: "Kuis 4", to: "/kuis4", halaman: 18 },
    ],
  },
  {
    title: "Event pada DOM",
    links: [
      { id: 19, title: "Mengenal Event DOM", to: "/materi/mengenalEvent", halaman: 19 },
      { id: 20, title: "Menangani Event DOM", to: "/materi/menanganiEventDom", halaman: 20 },
      { id: 21, title: "Menghentikan Event Bawaan", to: "/materi/menghentikanEventBawaan", halaman: 21 },
      { id: 22, title: "Menghentikan Perambatan Event", to: "/materi/perambatanEvent", halaman: 22 },
      { id: 23, title: "Kuis 5", to: "/kuis5", halaman: 23 },
    ],
  },
  {
    title: "Form DOM",
    links: [
      { id: 24, title: "Mengakses Form dan Elemen Form", to: "/materi/mengaksesForm-elemenForm", halaman: 24 },
      { id: 25, title: "Menangani Event dalam Form", to: "/materi/menanganiEventFormDom", halaman: 25 },
      { id: 26, title: "Validasi Form", to: "/materi/validasiForm", halaman: 26 },
      { id: 27, title: "Kuis 6", to: "/kuis6", halaman: 27 },
    ],
  },
  {
    id: 28,
    title: "Evaluasi",
    to: "/evaluasi",
    halaman: 28,
  },
];

export default menuDataMateri;
