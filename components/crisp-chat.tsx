"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-js";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("");
    }, []);

    return null;
};