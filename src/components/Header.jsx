import Link from "next/link"
import { useRouter } from "next/router"

const Header = () => {
  const router = useRouter()

  return (
    <header className="bg-[#222222] text-white py-8 px-4">
      <nav className="container mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold ml-4">Nmapper</h1>
        <ul className="flex space-x-8 mr-4">
          <li>
            <Link
              href="/"
              className={`text-lg ${
                router.pathname === "/"
                  ? "text-purple-500"
                  : "hover:text-[#00ff00]"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/lastScan"
              className={`text-lg ${
                router.pathname === "/lastScan"
                  ? "text-purple-500"
                  : "hover:text-[#00ff00]"
              }`}
            >
              Last Scan
            </Link>
          </li>
          <li>
            <Link
              href="/history"
              className={`text-lg ${
                router.pathname === "/history"
                  ? "text-purple-500"
                  : "hover:text-[#00ff00]"
              }`}
            >
              History
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
