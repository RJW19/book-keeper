"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './NavBar.module.css';
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

function AuthButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  if (session) {
    return (
      <>
        <Image src={session?.user.image} alt="Profile Picture" width={35} height={35} className="rounded" />
        <button onClick={handleSignOut} className={styles.authButton}>Sign Out</button>
      </>
    );
  }
  return (
    <button onClick={() => signIn()} className={styles.authButton}>Sign In</button>
  );
}

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinksWrapper}>
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/search" className={styles.navLink}>Search</Link>
          {session && (
            <>
            <Link href="/my-library" className={styles.navLink}>My Library</Link>
            <Link href="/profile" className={styles.navLink}>Profile</Link>
            </>
          )
        }
        </div>
        <div className={styles.authButtonWrapper}>
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
