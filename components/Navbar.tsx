import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "next-auth/react"
import ProfileMenu from "./ProfileMenu";

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

      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
