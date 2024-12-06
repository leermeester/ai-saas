"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("339cdd9c-b5e7-4563-8c3d-81b33599a04b");
    }, []);

    return null;
};