import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "../../extensions/ImageExtension";
import { useRef } from "react";

const Editor = () => {
  const content = `<figure class="e-image ProseMirror-selectednode" data-natural-width="500" data-natural-height="500" data-size="default" data-style="default" contenteditable="false" draggable="true"><img src="500x500.png" width="500" height="500" alt=""></figure>`;
  const inputRef = useRef<HTMLInputElement>(null);
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

  const onAddImageButton = async () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="h-full w-full relative">
      <div className="absolute bottom-0 left-0 p-2">
        <button
          onClick={onAddImageButton}
          className="p-2 bg-blue-300 text-white rounded hover:opacity-50"
        >
          画像を追加
        </button>
      </div>
      <input
        accept="image/png,image/jpeg,image/gif,image/webp,image/heic"
        ref={inputRef}
        type="file"
        className="hidden"
      />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
