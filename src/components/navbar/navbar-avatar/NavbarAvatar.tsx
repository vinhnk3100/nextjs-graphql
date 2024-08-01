import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type NavbarAvatarProps = {
    imgSrc: string;
}

export default function NavbarAvatar(props: NavbarAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={props.imgSrc} />
      <AvatarFallback>avatar</AvatarFallback>
    </Avatar>
  );
}