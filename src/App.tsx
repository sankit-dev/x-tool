import "./index.css";
import { CursorProvider } from "./contexts/CursorContext";
import { EditorStage } from "./components/editor/EditorStage";

function App() {
  return (
    <CursorProvider>
      <div className="min-h-screen w-full bg-neutral-950 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px]">
        <EditorStage />
      </div>
    </CursorProvider>
  );
}

export default App;
