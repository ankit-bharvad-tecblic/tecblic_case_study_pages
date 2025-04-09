import Editor from "../ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
const editorConfiguration = {
  //   toolbar: {
  //     items: [
  //       "heading",
  //       "|",
  //       "bold",
  //       "italic",
  //       "bulletedList",
  //       "numberedList",
  //       "|",
  //       "alignment",
  //       "outdent",
  //       "indent",
  //       "|",
  //       "undo",
  //       "redo",
  //     ],
  //   },
  //   language: "vi",
};

  function EditorCustom({handleEditorChange, form }) {
  return (
    <CKEditor
      editor={Editor}
      config={editorConfiguration}
      data={form.content}
      onChange={(event, editor) => handleEditorChange(event, editor)}
    />
  );
}
export default EditorCustom;
