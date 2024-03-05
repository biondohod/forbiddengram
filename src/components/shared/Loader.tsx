import { FC } from "react";
import { Loader2 } from "lucide-react";


export type LoaderProps = {
  message?: string;
  loaderWidth?: number;
  loaderHeight?: number;
  fontSize?: string;
};
/**
 * Renders a loader component with customizable message, font size, height, and width.
 *
 * @param {LoaderProps} props. The props for the Loader component.
 * @param {string} [props.message="Loading... Please wait"] - The message to display while loading. Default value: "Loading... Please wait"
 * @param {number} [props.loaderHeight=80] - The height of the loader spinner in pixels. Default value: 80.
 * @param {number} [props.loaderWidth=80] - The width of the loader spinner in pixels. Default value: 80.
 * @param {string} [props.fontSize] - Tailwind css class for font-size. Default value: "text-5xl".
 */
const Loader: FC<LoaderProps> = ({
  message = "Loading... Please wait",
  loaderHeight = 80,
  loaderWidth = 80,
  fontSize = "text-5xl"
}) => {
  return (
    <div className={`flex items-center justify-center m-auto ${fontSize} font-semibold gap-3`}>
      <Loader2
        className="flex justify-center items-center animate-spin"
        style={{ height: `${loaderHeight}px`, width: `${loaderWidth}px` }}
      />
      {message}
    </div>
  );
};

export default Loader;