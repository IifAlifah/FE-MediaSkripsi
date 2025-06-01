import React, { useState, useRef } from "react";
import "../../style/DomTreeInteractive.css";
import Header from "./header";
import { FaSearch } from "react-icons/fa";

const nodeData = {
  tag: "html",
  id: "root",
  children: [
    {
      tag: "head",
      id: "head",
      children: [
        {
          tag: "title",
          id: "title",
          children: [
            {
              tag: "#text",
              id: "text-title",
              content: "Contoh Halaman"
            }
          ]
        }
      ]
    },
    {
      tag: "body",
      id: "body",
      children: [
        {
          tag: "header",
          id: "header",
          children: [
            {
              tag: "h1",
              id: "main-heading",
              children: [
                {
                  tag: "#text",
                  id: "text-main-heading",
                  content: "Selamat Datang!"
                }
              ]
            }
          ]
        },
        {
          tag: "p",
          id: "paragraph1",
          children: [
            {
              tag: "#text",
              id: "text-paragraph1",
              content: "Ini adalah paragraf pertama."
            }
          ]
        },
        {
          tag: "footer",
          id: "footer",
          children: [
            {
              tag: "#text",
              id: "text-footer",
              content: "© 2025 Halaman Contoh"
            }
          ]
        }
      ]
    }
  ]
};

const relationDescriptions = {
  root: "Node root, induk dari semua elemen.",
  head: "Child dari <html>, sibling dengan <body>.",
  title: "Child dari <head>.",
  "text-title": "Child dari <title>.",
  body: "Child dari <html>, sibling dengan <head>.",
  header: "Child dari <body>, sibling dengan <p> dan <footer>.",
  "main-heading": "Child dari <header>.",
  "text-main-heading": "Child dari <h1>.",
  paragraph1: "Child dari <body>, sibling dengan <header> dan <footer>.",
  "text-paragraph1": "Child dari paragraf pertama.",
  footer: "Child terakhir dari <body>, sibling dengan <header> dan <p>",
  "text-footer": "Child dari <footer>."
};

const renderNode = (node, hoveredId, onEnter, onLeave, level = 0) => {
  const isHovered = hoveredId === node.id;

  return (
    <div
      key={node.id}
      className={`dom-node ${isHovered ? "hovered" : ""}`}
      style={{ marginLeft: `${level * 12}px` }}
      onMouseEnter={() => onEnter(node.id)}
      onMouseLeave={() => onLeave()}
    >
      {node.tag === "#text" ? `"${node.content}"` : `<${node.tag}>`}
      {isHovered && (
        <span className="inline-tooltip">
          {relationDescriptions[node.id] || "Deskripsi tidak tersedia."}
        </span>
      )}
      {node.children &&
        node.children.map((child) =>
          renderNode(child, hoveredId, onEnter, onLeave, level + 1)
        )}
      {node.tag !== "#text" && `</${node.tag}>`}
    </div>
  );
};

const DomTreeInteractive = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (id) => {
    clearTimeout(timeoutRef.current);
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredId(null);
    }, 200); // Delay 200ms agar tidak langsung hilang
  };

  return (
    <div className="dom-tree-container">
      <Header title="Mengenal Struktur DOM Secara Interaktif" icon={FaSearch}/>
      <p className="pengantar">
        Di bawah ini adalah representasi visual dari struktur DOM (Document Object Model) sebuah halaman HTML sederhana. 
        Setiap elemen HTML direpresentasikan sebagai sebuah node yang dapat disentuh dengan kursor. 
        Arahkan kursor ke setiap elemen untuk melihat keterangannya. 
      </p>
      <div className="code-area">
        {renderNode(nodeData, hoveredId, handleMouseEnter, handleMouseLeave)}
      </div>
    </div>
  );
};

export default DomTreeInteractive;
