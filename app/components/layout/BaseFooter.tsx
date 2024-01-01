"use client";

import { useTranslationContext } from "@/contexts/TranslationContext";

const BaseFooter = () => {
    const { _t } = useTranslationContext();

    return (
        <footer className="container py-10">
            <p>
                {_t("footer.developedBy")}{" "}
                <a
                    href="https://github.com/aliabb01"
                    target="_blank"
                    style={{ textDecoration: "underline" }}
                >
                    A3M NextGen Pvt.Ltd
                </a>
            </p>
        </footer>
    );
};

export default BaseFooter;
