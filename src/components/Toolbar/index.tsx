import { ChangeEvent, FormEvent, useState } from "react";
import { Editor } from "@tiptap/react";

type Props = {
  editor: Editor;
};

export const ToolBar = ({ editor }: Props) => {
  const [isVisibleAltInput, setVisibleAltInput] = useState(false);
  const [altText, setAltText] = useState("");

  const handleVisibleAltInput = () => {
    setVisibleAltInput(true);
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
  return (
    <>
      {isVisibleAltInput ? (
        <div className="rounded-md">
          <form
            onSubmit={handleAltTextSubmit}
            className="rounded-md flex p-2 border border-gray-300 "
          >
            <div className="rounded-md border border-gray-300">
              <input
                value={altText}
                onChange={handleChangeAltText}
                className="w-60 text-sm p-2 bg-gray-300 outline-none"
                placeholder="ALTテキストを入力"
              />
              <button type="submit" className="p-2 text-gray-500 text-sm">
                適用
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex">
          <button
            onClick={handleVisibleAltInput}
            className="text-gray-300 text-xs rounded w-8 h-8 flex items-center justify-center outline-none shadow hover:opacity-50"
          >
            ALT
          </button>
        </div>
      )}
    </>
  );
};
