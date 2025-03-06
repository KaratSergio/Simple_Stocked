import { FC } from 'react'
import Link from 'next/link'
import { MobileMenu } from '../../MobileMenu'

export const Header: FC = () => {
  return (
    <header className="container flex items-center justify-between bg-amber-600 p-4 text-white">
      <div className="text-xl font-extrabold text-black">MARKET</div>

      <nav className="hidden gap-8 md:flex">
        <Link href="/">Home</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/contact">Contacts</Link>
      </nav>

      <MobileMenu />
    </header>
  )
}
