import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "文字を入力してください。",
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
