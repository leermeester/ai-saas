"use client";

import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Heading } from "@/components/heading";
import { VideoIcon } from "lucide-react";
import { useState } from "react";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Empty from "@/components/empty";
import Loader from "@/components/loader";


const VideoPage = () => {
    const router = useRouter();
    const [video, setVideo] = useState<string>("");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });


    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
        setVideo("");

        const response = await axios.post("/api/video", values);

        setVideo(response.data[0]);
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
        title = "Video Generation"
        description="Turn your prompt into video."
        Icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
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
                                placeholder="Clownfish swimming aroudn a coral reef"
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
                <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                    <Loader />
                </div>
            )}
            
            {!video && !isLoading && (
                <div>
                    <Empty label="No video generated."/>
                </div>
            )}
            {video && (
                <video className="w-full aspect-video mt-8 rounded-lg border bg-black" controls>
                    <source src={video}/>
                </video>
            )}
        </div>
    </div>
</div>
  );
}

export default VideoPage;
