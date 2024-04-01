import { fontSizeLabelState, fontSizeState } from "./recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import "./app.css";

function App() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const fontSizeLabel = useRecoilValue(fontSizeLabelState);

  return (
    <div className="container">
      <div>Current font size: {fontSizeLabel}</div>
      <button onClick={() => setFontSize(fontSize + 1)} style={{ fontSize }}>
        Click to Enlarge
      </button>
      <button onClick={() => setFontSize(fontSize - 1)} style={{ fontSize }}>
        Click to Small
      </button>
      <br />
      <p style={{ fontSize }}>
        maxime recusandae dolor adipisci illum quidem deleniti. Nobis excepturi
        nihil explicabo quos beatae ducimus est nemo, commodi, accusamus
        recusandae voluptates provident mollitia eos aut? Nihil magnam dolor
        sint! Minus in impedit rerum, nisi provident reprehenderit? Totam
        consectetur excepturi harum odio autem corrupti aliquid laudantium,
        consequuntur saepe animi provident. Laborum omnis a possimus tempore
        nisi voluptatem. Asperiores ut molestias suscipit, ratione, dicta iste
        vel pariatur nisi illo quam magni provident amet odit ipsam illum
        temporibus incidunt velit nemo expedita voluptate eveniet.
      </p>
    </div>
  );
}

export default App;
