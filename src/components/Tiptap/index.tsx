import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "../../extensions/ImageExtension";

const Editor = () => {
  const content = `<figure class="e-image ProseMirror-selectednode" data-natural-width="500" data-natural-height="500" data-size="default" data-style="default" contenteditable="false" draggable="true"><img src="500x500.png" width="500" height="500" alt=""></figure>`;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Placeholder.configure({
        placeholder: "文字を入力してください。",
      }),
      Image,
    ],
    content,
    editorProps: {
      attributes: {
        class: "p-4 focus:outline-none h-full w-full",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} className="h-full w-full" />;
};

export default Editor;
