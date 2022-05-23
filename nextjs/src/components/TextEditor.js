import { useCallback, useState, useEffect } from "react";
import "quill/dist/quill.snow.css";
import { styled } from "@mui/material/styles";
import { TOOLBAR_OPTIONS } from "src/utility/quillToolbar";

const Item = styled("div")(({ theme, quill }) => ({
  width: "100%",
  "& .ql-editor": {
    // width: "8.5in",
    minHeight: "1in",
    padding: "1in",
    margin: "1rem",
    boxShadow: "0 0 5px rgba(0,0,0,.5)",
    backgroundColor: "#fff",
  },
  "& .ql-container.ql-snow": {
    border: "none",
  },
}));

export default function TextEditor() {
  const [quill, setQuill] = useState();

  useEffect(() => {
    if (quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      //
      console.log("delta", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [quill]);

  const wrapperRef = useCallback(async (wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);
    const Quill = (await import("quill")).default;
    const quillInstance = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    quillInstance.setContents([
      { insert: "Hello " },
      { insert: "World!", attributes: { bold: true } },
      { insert: "\n" },
    ]);
    // quillInstance.disable();
    setQuill(quillInstance);
  }, []);

  return <Item ref={wrapperRef} quill="quill"></Item>;
}
