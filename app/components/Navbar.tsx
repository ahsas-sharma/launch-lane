import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import Image from "next/image";
const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-white shadow-sm px-4 py-2 text-black">
      <nav className="flex justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={60}
            quality={100}
            priority={true}
          />
        </Link>

        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="">💻 Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="">🏃 Logout</span>
                </button>
              </form>
              <Link href={`/users/${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">
                <span className="">👋 Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
