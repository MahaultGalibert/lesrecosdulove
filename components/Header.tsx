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
    <div className="ml-auto">
      <Link
        className="font-bold color-grey inline-block"
        data-active={isActive("/")}
        href="/"
      >
        Accueil
      </Link>
    </div>
  )

  let right = null

  if (status === "loading") {
    left = (
      <div className="ml-auto">
        <Link
          className="no-underline font-bold color-grey ml-4 inline-block"
          data-active={isActive("/")}
          href="/"
        >
          Accueil
        </Link>
      </div>
    )
    right = (
      <div className="ml-auto">
        <p>Validating session ...</p>
      </div>
    )
  }

  if (!session) {
    right = (
      <div className="ml-auto">
        <Link
          className="no-underline ml-4 inline-block px-2 py-4 border border-solid rounded"
          data-active={isActive("/signin")}
          href="/api/auth/signin"
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
          className="no-underline font-bold color-gray ml-4 inline-block"
          data-active={isActive("/")}
          href="/"
        >
          Accueil
        </Link>
        <Link
          className="ml-4 inline-block"
          data-active={isActive("/recos")}
          href="/recos"
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
          className="no-underline ml-4 inline-block px-2 py-4 border border-solid rounded"
          href="/create"
        >
          <button>Nouvelle reco</button>
        </Link>
        <button className="border-none" onClick={() => signOut()}>
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
