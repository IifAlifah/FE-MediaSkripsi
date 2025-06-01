import EditorOutput from "../components/editor";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EditorPage = () => {
  return (
    <>
    <Navbar />
        <div className="container py-1">
            <EditorOutput className="mt-4 mb-4" />
        </div>
    <Footer />
    </>
  );
};

export default EditorPage;
