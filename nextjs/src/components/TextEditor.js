import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { AXIOS_OPTION, API_URL } from "src/config";
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
          handlers: { image: imageHandler },
        },
      },
    });

    quillInstance.setContents(story);
    // quillInstance.disable();
    setQuill(quillInstance);
  }, []);

  return <Item ref={wrapperRef} quill="quill" handleSubmit></Item>;
}

const imageHandler = () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  // Listen upload local image and save to server
  input.onchange = () => {
    const file = input.files[0];

    // file type is only image.
    if (/^image\//.test(file.type)) {
      saveToServer(file);
    } else {
      console.warn("You can only upload images.");
    }
  };
};

const saveToServer = async (photo) => {
  const fd = new FormData();
  fd.append("photo", photo);
  fd.append("extraPath", "story");

  const imageURL = await axios.post(
    `${API_URL}/uploads`,
    fd,
    { withCredentials: true },
    AXIOS_OPTION(photo.type)
  );

  insertToEditor(imageURL);
};

function insertToEditor(url) {
  let range = quillInstance.getSelection();

  quillInstance.insertEmbed(
    range.index,
    "image",
    `http://localhost:5000/${url.data.data}`
  );
  // wrapper.appendChild(input);
}
