import EditorOutput from "../components/editor";
import Navbar from "../components/Navbar_profile";

const EditorPage = () => {
  return (
    <>
    <Navbar />
        <div className="container py-1" style={{ minHeight: "300px", marginTop: "60px" }}>
            <EditorOutput className="mt-4 mb-4" />
        </div>
    </>
  );
};

export default EditorPage;
