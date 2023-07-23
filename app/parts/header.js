import Image from "next/image";
import Link from "next/link";
// import styles from './page.module.css'
// import illustration from "./https://seadn.weknowcreators.xyz/media/content/hero-illustration.png";

export default function Home() {
  return (
    <>
      <div className="navbar bg-base-100 sticky top-0 z-10">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
            Password Generator
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src="https://picsum.photos/200"
                  alt="people"
                  width={80}
                  height={80}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  className="justify-between"
                  href="https://github.com/mikeyhodl/passgen"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                  <span className="badge">New</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
