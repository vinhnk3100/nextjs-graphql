import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type NavbarAvatarProps = {
    imgSrc: string;
}

export default function NavbarAvatar(props: NavbarAvatarProps) {
  return (
    <Avatar className="group relative border rounded-full border-transparent w-full h-full">
      <div className="opacity-0 hover:opacity-20 transition-all absolute w-12 h-12 bg-zinc-50"></div>
      <AvatarImage src={props.imgSrc} className="w-12 h-12" />
      <AvatarFallback>avatar</AvatarFallback>
    </Avatar>
  );
}