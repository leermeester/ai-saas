"use client";

import axios from "axios";
import * as z from "zod";
import { ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Heading } from "@/components/heading";
import { useState } from "react";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Empty from "@/components/empty";
import Loader from "@/components/loader";   
import { cn } from "@/lib/utils"
import UserAvatar from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";


const ImagePage = () => {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    });


    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
        setImages([]);

        const response = await axios.post("/api/image", values);

        const urls = response.data.map((image: { url: string }) => image.url);

        form.reset();
        } catch (error: any) {
            // TODO: Open Pro Model
        console.log(values);
        } finally {
            router.refresh();
        }
    };




  return (
    <div>
        <Heading 
        title = "Image Generation"
        description="Turn your prompt into an image."
        Icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
        />
    <div className="px-4 lg:px-8">
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div
                        className="
                            rounded-lg
                            border
                            w-full
                            p-4
                            px-3
                            md:px-6
                            focus-within:shadow-sm
                            grid
                            grid-cols-12
                            gap-2
                        "
                    >
                        <FormField
                        control={form.control}
                        name="prompt"
                        render={({field}) => (
                            <FormItem className="col-span-12 lg:col-span-10">
                            <FormControl className="m-0 p-0">
                                <Input
                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                disabled={isLoading}
                                placeholder="Ask anything..."
                                {...field}
                                />
                            </FormControl>
                            </FormItem>
                        )}
                        />
                        <Button
                        type="submit"
                        className="col-span-12 lg:col-span-2 w-full"
                        disabled={isLoading}
                        >
                            Generate
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
        <div className="space-y-4 mt-4">
            {isLoading && (
                <div className="p-20">
                    <Loader />
                </div>
            )}
            
            {images.length === 0 && !isLoading && (
                <div>
                    <Empty label="No images generated."/>
                </div>
            )}
            <div>
                Images will be rendered here. 
            </div>
        </div>
    </div>
</div>
  );
}

export default ImagePage;
