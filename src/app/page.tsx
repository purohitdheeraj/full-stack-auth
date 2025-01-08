import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
    
  return (
    <div className="grid grid-rows-[20px_1fr_20px]">
    Hare Krishna Landing Page
    
    <Link href="/login">
      Login
    </Link>

    <Link href="/signup">
      Signup
    </Link>

    </div>
  );
}
