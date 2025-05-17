"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import UserProfileSidbarMenu from "./UserProfileSidbarMenu";

const SidbarProfile = ({ lang }) => {
  //? ================= START Push to home when user is logout =================
  const router = useRouter();
  const session = useSession();
  if (session.status == "unauthenticated") {
    router.push(`/${lang}`);
  }
  //? ================= / END Push to home when user is logout =================

  return (
    <>
      <aside className="fixed shadow-2xl h-screen bg-white">
        {/* ============================= ** START sidbar LOGO ** ============================= */}
        <header className="hidden lg:flex justify-center items-center p-5">
          <Link className="" href={`/${lang}`}>
            <Image
              src="/images/panotech.jpg"
              alt=" پانوتک "
              width={200}
              height={40}
              className=" rounded-lg hover:shadow-md hover:shadow-green-100 "
            />
          </Link>
        </header>
        {/* ============================= ** / END sidbar LOGO ** ============================= */}
        {/* ============================= ** START sidbar MENU ** ============================= */}
        <UserProfileSidbarMenu lang={lang} />
        {/* ============================= ** / END sidbar MENU ** ============================= */}
      </aside>
      {/* ======================== ** START sidbar ResponsiveLOGO ** ======================== */}
      <header className="lg:hidden ms-8 pt-8 pr-10 flex justify-center items-center">
        <Link href={`/${lang}`}>
          <Image
            src="/images/panotech.jpg"
            width={236}
            height={48}
            alt=" پانوتک "
            className="rounded-lg hover:shadow-md hover:shadow-green-100 my-2"
          />
        </Link>
      </header>
      {/* ======================== ** / END sidbar ResponsiveLOGO ** ======================== */}
    </>
  );
};

export default SidbarProfile;
