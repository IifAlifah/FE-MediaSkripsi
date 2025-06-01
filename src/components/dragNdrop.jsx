import { useState, useEffect } from "react";
import "../../style/DragDrop.css"; 
import Swal from "sweetalert2";


const DragDropActivity = ({ onSuccess }) => {
  const [feedback, setFeedback] = useState(""); 
  const [items, setItems] = useState([
    { id: "item1", content: '<h1 id="header">', type: "element" },
    { id: "item2", content: '<p class="intro">', type: "element" },
    { id: "item3", content: '<img src="logo.png" alt="Logo">', type: "element" },
    { id: "item4", content: '"Tentang Kami"', type: "text" },
    { id: "item5", content: '"Selamat datang di situs kami!"', type: "text" },
    { id: "item6", content: '"Hak Cipta 2024 - Semua Hak Dilindungi"', type: "text" },
    { id: "item7", content: 'class="intro', type: "attribute" },
    { id: "item8", content: 'id="header"', type: "attribute" },
    { id: "item9", content: "<footer>", type: "element" },
    { id: "item10", content: "<nav>", type: "element" },
    { id: "item11", content: 'src="logo.png"', type: "attribute" },
    { id: "item12", content: '"Kopi Nusantara"', type: "text" },
    { id: "item13", content: '"Home"', type: "text" },
    { id: "item14", content: '<a href="mailto:info@example.com">', type: "element" },
    { id: "item15", content: 'lang="en"', type: "attribute" },
    { id: "item16", content: 'alt="Logo"', type: "attribute" },
    { id: "item17", content: '"Hubungi kami untuk informasi lebih lanjut"', type: "text" },
    { id: "item18", content: 'href="mailto:info@example.com"', type: "attribute" },
  ]);

  const [answers, setAnswers] = useState({
    elementNodeDrop: [],
    textNodeDrop: [],
    attributeNodeDrop: [],
  });

  const handleDrop = (e, dropboxId) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    const droppedItem = items.find((item) => item.id === itemId); 
    if (droppedItem) {
      setAnswers((prevAnswers) => {
        if (!prevAnswers[dropboxId].find((item) => item.id === itemId)) {
          return {
            ...prevAnswers,
            [dropboxId]: [...prevAnswers[dropboxId], droppedItem], 
          };
        }
        return prevAnswers;
      });

      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }
  };

  const handleSubmit = () => {
  let isCorrect = true;

  Object.keys(correctAnswers).forEach((key) => {
    const correct = correctAnswers[key].sort();
    const userAnswers = answers[key].map((item) => item.id).sort();

    if (JSON.stringify(correct) !== JSON.stringify(userAnswers)) {
      isCorrect = false;
    }
  });

  if (isCorrect) {
    Swal.fire({
      icon: 'success',
      title: 'Jawaban Benar!',
      text: 'Jawaban Anda sudah sesuai!',
    });
    if (typeof onSuccess === "function") {
      onSuccess(); 
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Jawaban Salah',
      text: 'Jawaban belum sesuai. Coba lagi ya!',
    });
  }
};

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const correctAnswers = {
    elementNodeDrop: ["item1", "item2", "item3", "item9", "item10", "item14",],
    textNodeDrop: ["item4", "item5", "item6", "item12", "item13", "item17",],
    attributeNodeDrop: ["item7", "item8", "item11", "item15", "item16", "item18",],
  };

  useEffect(() => {
    setItems((prevItems) => [...prevItems.sort(() => Math.random() - 0.5)]);
  }, []);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleReset = () => {
    setAnswers({
      elementNodeDrop: [],
      textNodeDrop: [],
      attributeNodeDrop: [],
    });
    setFeedback("");
    setItems([
      { id: "item1", content: '<h1 id="header">', type: "element" },
      { id: "item2", content: '<p class="intro">', type: "element" },
      { id: "item3", content: '<img src="logo.png" alt="Logo">', type: "element" },
      { id: "item4", content: '"Tentang Kami"', type: "text" },
      { id: "item5", content: '"Selamat datang di situs kami!"', type: "text" },
      { id: "item6", content: '"Hak Cipta 2024 - Semua Hak Dilindungi"', type: "text" },
      { id: "item7", content: 'class="intro"', type: "attribute" },
      { id: "item8", content: 'id="header"', type: "attribute" },
      { id: "item9", content: "<footer>", type: "element" },
      { id: "item10", content: "<nav>", type: "element" },
      { id: "item11", content: 'src="logo.png"', type: "attribute" },
      { id: "item12", content: '"Kopi Nusantara"', type: "text" },
      { id: "item13", content: '"Home"', type: "text" },
      { id: "item14", content: '<a href="mailto:info@example.com">', type: "element" },
      { id: "item15", content: 'lang="en"', type: "attribute" },
      { id: "item16", content: 'alt="Logo"', type: "attribute" },
      { id: "item17", content: '"Hubungi kami untuk informasi lebih lanjut"', type: "text" },
      { id: "item18", content: 'href="mailto:info@example.com"', type: "attribute" },
    ]);
  };

  return (
    <div className="drag-drop-container">
      <h4>Identifikasi Node dalam HTML</h4>
      
      <div className="instruksi-container">
        <h5>Instruksi:</h5>
        <ol>
          <li>Setelah mempelajari materi tentang node, kerjakan aktivitas berikut untuk memastikan pemahamanmu mengenai perbedaan antara ketiga jenis node tersebut.</li>
          <li>Kamu akan diberikan potongan kode HTML yang mengandung berbagai jenis node.</li>
          <li>Identifikasilah jenis-jenis node yang ada dalam potongan HTML tersebut dan tentukan apakah itu Element Node, Text Node, atau Attribute Node.</li>
          <li>Drag and drop setiap node yang ada ke dalam kotak kategori yang sesuai.</li>
          <li>Setelah selesai, klik tombol Submit untuk mengirimkan hasilmu.</li>
        </ol>
      </div>

      <div className="dropbox-container mt-4">
        <div
          className="dropbox"
          id="elementNodeDrop"
          onDrop={(e) => handleDrop(e, "elementNodeDrop")}
          onDragOver={handleDragOver}
        >
          <h3>Element Node</h3>
          {answers.elementNodeDrop.map((item) => (
            <div key={item.id} className="item">
              {item.content}
            </div>
          ))}
        </div>

        <div
          className="dropbox"
          id="textNodeDrop"
          onDrop={(e) => handleDrop(e, "textNodeDrop")}
          onDragOver={handleDragOver}
        >
          <h3>Text Node</h3>
          {answers.textNodeDrop.map((item) => (
            <div key={item.id} className="item">
              {item.content}
            </div>
          ))}
        </div>

        <div
          className="dropbox"
          id="attributeNodeDrop"
          onDrop={(e) => handleDrop(e, "attributeNodeDrop")}
          onDragOver={handleDragOver}
        >
          <h3>Attribute Node</h3>
          {answers.attributeNodeDrop.map((item) => (
            <div key={item.id} className="item">
              {item.content}
            </div>
          ))}
        </div>
      </div>

      <div className="item-container">
        {items.map((item) => (
          <div
            key={item.id}
            className="item"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item.id)}
          >
            {item.content}
          </div>
        ))}
      </div>

      <div className="action-buttons mt-2">
        <button onClick={handleSubmit} className="btn btn-info">Submit</button>
        <button onClick={handleReset} className="btn btn-danger" >Reset</button>
      </div>
      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
};

export default DragDropActivity;
