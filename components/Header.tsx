// Header.tsx
import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"

const Header: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  const { data: session, status } = useSession()

  let left = (
    <div className="left">
      <Link
        data-active={isActive("/")}
        href="/"
        className="no-underline font-bold active:text-gray-500 hover:text-gray-500 ml-4 inline-block"
      >
        Accueil
      </Link>
    </div>
  )

  let right = null

  if (status === "loading") {
    left = (
      <div className="left">
        <Link
          data-active={isActive("/")}
          href="/"
          className="no-underline font-bold active:text-gray-500 hover:text-gray-500 ml-4 inline-block"
        >
          Accueil
        </Link>
      </div>
    )
    right = (
      <div className="right">
        <p>Validating session ...</p>
      </div>
    )
  }

  if (!session) {
    right = (
      <div className="ml-auto">
        <Link
          data-active={isActive("/signin")}
          href="/api/auth/signin"
          className="no-underline ml-4 inline-block px-2 py-4"
        >
          Log in
        </Link>
      </div>
    )
  }

  if (session) {
    left = (
      <div className="left">
        <Link
          data-active={isActive("/")}
          href="/"
          className="no-underline font-bold active:text-gray-500 hover:text-gray-500 ml-4 inline-block"
        >
          Accueil
        </Link>
        <Link
          data-active={isActive("/recos")}
          href="/recos"
          className="no-underline active:text-gray-500 hover:text-gray-500 ml-4 inline-block"
        >
          Mes recos
        </Link>
      </div>
    )
    right = (
      <div className="ml-auto">
        <p className="inline-block text-xs pr-4">
          {session.user.name} ({session.user.email})
        </p>
        <Link
          className="no-underline mx-4 inline-block px-2 py-4"
          href="/create"
        >
          <button className="border-none text-sm">Nouvelle reco</button>
        </Link>
        <button className="border-none text-sm" onClick={() => signOut()}>
          Log out
        </button>
      </div>
    )
  }

  return (
    <nav className="flex p-8 items-center">
      {left}
      {right}
    </nav>
  )
}

export default Header
