import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";

const Navbar = async () => {
  // //build a test session for office old no local grafbase db mac
  // const session = {
  //   user: {
  //     id: "12345",
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //     avatarUrl: "https://example.com/john-doe-avatar.jpg",
  //   },
  // };

  const session = await getCurrentUser();
  return (
    <nav className="flexBetween navba">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" alt={"logo"} width={115} height={43} />
        </Link>
        <ul className="xl:flex hidden text-small gap-7s">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div>
        {session?.user ? (
          <>
            {session?.user?.image && (
              <Link href={`/profile/${session?.user?.id}`}>
                <Image
                  className="rounded-full"
                  src={session.user.image}
                  alt={session.user.name}
                  width={40}
                  height={40}
                />
              </Link>
            )}
            <Link href={"/create-project"}>Share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
