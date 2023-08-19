import Link from "next/link";

export default function Header() {
    return (
        <header>
            <div className='w-full h-18 mainback myheader py-4 items-center text-lightText sticky top-0 flex flex-row z-50'>
                <div className='myheader-left'>
                    {/* Logooooooo */}
                    <h1 className='px-2 border border-transparent cursor-pointer flex-item-center justify-center h-[70%]'>
                        <Link href='/auth/login' className='w-28 mt-1 object-cover font-bold text-white'> Blogging App </Link>
                    </h1>
                </div>

                <div className="myheader-rig">
                    <div className="mtheader-rig-con">
                    <Link
                        href="/"
                        class="text-white font-bold listnav">Home</Link>
                    <Link
                        href="/profile"
                        class="text-white font-bold listnav">Profile</Link>
                    </div>
                 
                </div>
            </div>
        </header>);
}