import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Placeholder.configure({
        placeholder: "文字を入力してください。",
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
        inline: false,
      }),
    ],
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
