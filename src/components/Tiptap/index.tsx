import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
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
