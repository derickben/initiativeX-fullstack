import { useCallback, useState, useEffect } from "react";
import "quill/dist/quill.snow.css";
import { styled } from "@mui/material/styles";
import { TOOLBAR_OPTIONS } from "src/utility/quillToolbar";
import fi from "date-fns/locale/fi/index";

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

let quillInstance;

export default function TextEditor({ id, quill, setQuill, story }) {
  // const [quill, setQuill] = useState();

  useEffect(() => {
    if (quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;

      // setStory(quill.getContents());
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [quill]);

  useEffect(() => {
    if (quill == null) return;

    quill.setContents(story);
  }, [id, quill]);

  const wrapperRef = useCallback(async (wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);
    const Quill = (await import("quill")).default;
    quillInstance = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: {
          container: TOOLBAR_OPTIONS,
          handlers: { image: imageHandler(wrapper) },
        },
      },
    });

    quillInstance.setContents(story);
    // quillInstance.disable();
    setQuill(quillInstance);
  }, []);

  return <Item ref={wrapperRef} quill="quill" handleSubmit></Item>;
}

const imageHandler = (wrapper) => () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  const url = "www.facebook.com";

  // Listen upload local image and save to server
  input.onchange = () => {
    const file = input.files[0];

    // file type is only image.
    if (/^image\//.test(file.type)) {
      insertToEditor(url, wrapper, input);
    } else {
      console.warn("You could only upload images.");
    }
  };
};

function insertToEditor(url, wrapper, input) {
  let range = quillInstance.getSelection();
  console.log("wrapper", wrapper);
  quillInstance.insertEmbed(
    range.index,
    "image",
    `http://localhost:9000${url}`
  );
  // wrapper.appendChild(input);
}
