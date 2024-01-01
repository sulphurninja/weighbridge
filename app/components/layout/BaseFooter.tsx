"use client";

import { useTranslationContext } from "@/contexts/TranslationContext";

const BaseFooter = () => {
    const { _t } = useTranslationContext();

    return (
        <footer className="container py-10">
            <p>
              Developed by Aditya
            </p>
        </footer>
    );
};

export default BaseFooter;
