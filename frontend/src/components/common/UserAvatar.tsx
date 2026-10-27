import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { getImgUrl } from "@/utils/img";

const UserAvatar = ({
  avatar,
  alt = "Avatar Image",
  fallback = "F",
}: {
  avatar: string;
  alt?: string;
  fallback?: string;
}) => {
  return (
    <Avatar size="lg" className="shrink-0">
      {avatar ? (
        <Image
          src={getImgUrl(avatar) ?? ""}
          alt={alt}
          width={400}
          height={400}
        />
      ) : (
        <AvatarFallback className={"bg-gray-200 text-black"}>
          {fallback}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
