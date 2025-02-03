import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "../../extensions/ImageExtension";
import { useRef } from "react";

const Editor = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Placeholder.configure({
        placeholder: "文字を入力してください。",
      }),
      Image,
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const handleInsertImages = (url: string) => {
    const img = document.createElement("img");
    img.src = url;
    img.onload = () => {
      console.log(img);
      const { naturalWidth, naturalHeight } = img;
      editor
        .chain()
        .focus()
        .setImage({
          "data-natural-height": naturalHeight,
          "data-natural-width": naturalWidth,
          "data-size": "default",
          "data-style": "default",
          src: img.src,
          alt: "",
          height: naturalHeight,
          width: naturalWidth,
        })
        .run();
    };
  };

  const onAddImageButton = async () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="relative">
      <div className="bg-gray-100 p-2 w-full sticky top-0 z-10">
        <button
          onClick={onAddImageButton}
          className="p-2 text-white bg-gray-300 rounded"
        >
          画像追加
        </button>
        <input
          accept="image/png,image/jpeg,image/gif,image/webp,image/heic"
          ref={inputRef}
          type="file"
          onChange={(event) => {
            if (event.target.files) {
              const file = event.target.files[0];
              const url = URL.createObjectURL(file);
              handleInsertImages(url);
            }
          }}
          className="hidden"
        />
      </div>
      <div className="mx-auto w-full px-6 xs:px-7 sm:px-10 max-w-screen-md py-24">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
