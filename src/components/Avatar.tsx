import { nameToColor } from "@/lib/colorGenerator";
import Image from "next/image";

interface AvatarProps {
  src: string | null;
  alt: string;
  width?: number;
  height?: number;
  textSize?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  width = 20,
  height = 20,
  textSize = 8,
}) => {
  const shortName = alt.split(" ").map((e) => {
    return e.charAt(0);
  });

  return (
    <div
      className="border-1 rounded-full overflow-hidden bg-secondary"
      style={{ width: width, height: height }}
    >
      {src ? (
        <Image
          src={src}
          alt={shortName.join("")}
          width={height - 2}
          height={width - 2}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className=" flex justify-center items-center"
          style={{ fontSize: textSize, backgroundColor: nameToColor(alt) }}
        >
          {shortName}
        </div>
      )}
    </div>
  );
};

export default Avatar;
