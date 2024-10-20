import { ReactNode } from "react";

interface WrapperProps {
    children: ReactNode;
    classOptions: string
}

export default function Section({children,classOptions}: WrapperProps) {
    return (
        <section className={`${classOptions} w-100`}>
            {children}
        </section>
    )
}