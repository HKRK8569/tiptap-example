import Placeholder from "@tiptap/extension-placeholder";
import { BubbleMenu, Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "../../extensions/ImageExtension";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { ImageToolBar } from "../Toolbar";

export const handleInsertImages = (editor: Editor, urls: string[]) => {
  urls.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;
    img.onload = () => {
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
  });
};
const TipTapEditor = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isVisibleAltInput, setVisibleAltInput] = useState(false);
  const [altText, setAltText] = useState("");

  useEffect(() => {
    console.log(isVisibleAltInput);
  }, [isVisibleAltInput]);

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

  const handleVisibleAltInput = () => {
    setVisibleAltInput(true);
  };

  const handleHideAltInput = () => {
    setAltText("");
    setVisibleAltInput(false);
  };

  const handleAltTextSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editor.commands.updateAttributes("image", {
      alt: altText,
    });
    setAltText("");
    setVisibleAltInput(false);
  };

  const handleChangeAltText = (event: ChangeEvent<HTMLInputElement>) => {
    setAltText(event.target.value);
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
          multiple
          onChange={(event) => {
            if (event.target.files) {
              const files = event.target.files;
              const urls: string[] = [];
              if (files) {
                for (const file of files) {
                  const url = URL.createObjectURL(file);
                  urls.push(url);
                }
              }
              handleInsertImages(editor, urls);
            }
          }}
          className="hidden"
        />
      </div>
      <div className="mx-auto w-full px-6 xs:px-7 sm:px-10 max-w-screen-md py-24">
        <EditorContent editor={editor} />
      </div>
      <BubbleMenu
        shouldShow={({ from, to }) => {
          const isSelectImage = editor.isActive("image");
          const isSelectRange = from !== to;
          handleHideAltInput();
          return isSelectImage || isSelectRange;
        }}
        editor={editor}
      >
        <ImageToolBar
          altText={altText}
          isVisibleAltInput={isVisibleAltInput}
          handleVisibleAltInput={handleVisibleAltInput}
          handleAltTextSubmit={handleAltTextSubmit}
          handleChangeAltText={handleChangeAltText}
        />
      </BubbleMenu>
    </div>
  );
};

export default TipTapEditor;
