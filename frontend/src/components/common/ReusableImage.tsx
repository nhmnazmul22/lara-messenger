import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { getImgUrl } from "@/utils/file";

const ReusableImage = ({
  avatar,
  alt = "Avatar Image",
  fallback = "F",
  className = "shrink-0",
}: {
  avatar: string;
  alt?: string;
  fallback?: string;
  className?: string;
}) => {
  return (
    <Avatar size="lg" className={className}>
      {avatar ? (
        <Image
          src={getImgUrl(avatar) ?? ""}
          alt={alt}
          width={400}
          height={400}
          className="object-cover rounded-full object-top"
        />
      ) : (
        <AvatarFallback className={"bg-gray-200 text-black"}>
          {fallback}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default ReusableImage;
