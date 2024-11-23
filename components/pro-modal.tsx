"use client";

import { MessageSquare, Music, Image, Video, Code, Check, Zap } from "lucide-react";


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const tools = [
    {
      label: "Conversation",
      icon: MessageSquare,
      href: "/conversation",
      color: "text-violet-500",
      bgColor: "bg-violet-500/10"
    },
    {
      label: "Image Generation",
      icon: Image,
      href: "/image",
      color: "text-pink-700",
      bgColor: "bg-pink-700/10"
    },
    {
      label: "Video Generation",
      icon: Video,
      href: "/video",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      label: "Music Generation",
      icon: Music,
      href: "/music",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      label: "Code Generation",
      icon: Code,
      href: "/code", 
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
  
  ]
  

export const ProModal = () => {
    const proModal = useProModal();


    return (
        <div>
            <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                            <div className="flex items-center gap-x-2 font-bold py-1 px-3 bg-primary/10 rounded-md text-primary">
                            Upgrade to Pro
                                <Badge className="text-sm text-white bg-green-500" variant="premium">
                                    PRO
                                </Badge>
                            </div>
                        </DialogTitle>
                        <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                            {tools.map((tool) => (
                                <Card
                                    key={tool.label}
                                    className="p-3 border-black/5 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-x-4">
                                        <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                            <tool.icon className={cn("w-6 h-6", tool.color)} />
                                        </div>
                                        <div className="font-semibold text-sm">
                                            {tool.label}
                                        </div>
                                    </div>
                                    <Check className="w-5 h-5 text-primary" />
                                </Card>
                            ))}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button 
                        size="lg" 
                        variant="premium" 
                        className="w-full">
                            Upgrade
                            <Zap className="w-4 h-4 ml-2 fill-white" />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};