import { useMemo } from "react";

// Next
import Link from "next/link";
import Image from "next/image";



// ShadCn
import { Card } from "@/components/ui/card";

// Components
import { DevDebug, LanguageSelector, ThemeSwitcher } from "@/app/components";

const BaseNavbar = () => {
    const devEnv = useMemo(() => {
        return process.env.NODE_ENV === "development";
    }, []);

    return (
        <header className="lg:container z-[99]">
            <nav>
                <Card className="flex flex-wrap justify-between items-center px-5 py-5 gap-5">
                    <Link href={"/"}>
                        <h1 className="font-bold text-2xl">Print Bill</h1>
                    </Link>
                    {/* ? DEV Only */}
                    {/* {devEnv && <DevDebug />} */}
                    <ThemeSwitcher />
                </Card>
            </nav>
        </header>
    );
};

export default BaseNavbar;
