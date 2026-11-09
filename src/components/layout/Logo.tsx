import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center"
    >
      <Image
        src="/images/hashtech-logo.png"
        alt="HashTech Solutions"
        width={866}
        height={288}
        className="h-16 w-auto object-contain"
      />
    </Link>
  );
}
