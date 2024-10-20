import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
    return (
        <nav className="flex justify-between items-center p-5">
            <Link href='#' className="flex justify-start gap-3 items-center pl-4">
                <Image src='/img/logo.png' width={32} height={32} alt="logo"></Image>
                <span className="align-centers font-bold">Super Todo</span>
            </Link>
            <ul className="flex flex-row gap-10 pr-4">
                <li><Link href='/Login'>Home</Link></li>
                <li><Link href='/Login'>Features</Link></li>
                <li><Link href='/Login'>Pricing</Link></li>
                <li><Link href='/todos'>Login</Link></li>
            </ul>
        </nav>
    )
}