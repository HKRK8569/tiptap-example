import { ChangeEvent, FormEvent, useState } from "react";
import SizeChangeIcon from "../icon/ReductionIcon";
import ReductionIcon from "../icon/ReductionIcon";
import ExpansionIcon from "../icon/ExpansionIcon";

type Props = {
  altText: string;
  isVisibleAltInput: boolean;
  handleVisibleAltInput: () => void;
  handleAltTextSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleChangeAltText: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChangeSize: (size:"default" | "small") => void
};

export const ImageToolBar = ({
  altText,
  isVisibleAltInput,
  handleAltTextSubmit,
  handleChangeAltText,
  handleVisibleAltInput,
  handleChangeSize
}: Props) => {
  const [size, setSize] = useState("default")
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
        <div className="flex gap-2">
          <button
            onClick={handleVisibleAltInput}
            className="text-gray-300 text-xs rounded w-8 h-8 flex items-center justify-center outline-none shadow hover:opacity-50"
          >
            ALT
          </button>
          <button onClick={()=>{
            const changedSize = size === "default" ?  "small" : "default"
            setSize(changedSize)
            handleChangeSize(changedSize)
          }} className="text-gray-300 text-xs rounded w-8 h-8 flex items-center justify-center outline-none shadow hover:opacity-50">
            {
              size === "default" ? (
                <ReductionIcon className="size-4" />
              ) : (
                <ExpansionIcon className="size-4" />
              )
            }
          </button>
        </div>
      )}
    </>
  );
};
