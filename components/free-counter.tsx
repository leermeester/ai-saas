"use client";

import { Zap } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useState, useEffect } from "react";
interface FreeCounterProps {
    apiLimitCount: number;
    isPro: boolean;
}

import { Progress } from "./ui/progress";
import { MAX_FREE_COUNTS } from "@/constants";
import { Button } from "./ui/button";
import { useProModal } from "@/hooks/use-pro-modal";


export const FreeCounter = ({
    apiLimitCount = 0,
    isPro = false,
}: FreeCounterProps) => {
    const proModal = useProModal();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    if (isPro) {
        return null;
    }

    return (
        <div className="px-3"   >
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
                        </p>
                    </div>
                    <Progress
                        className="h-3"
                        value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
                    />
                    <div className="mt-4">
                        <Button onClick={proModal.onOpen} className="w-full" variant="premium">
                            Upgrade 
                            <Zap className="w-4 h-4 ml-2 fill-white"/>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}