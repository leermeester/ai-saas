"use client";

import axios from "axios";
import * as z from "zod";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { Heading } from "@/components/heading";
import { Music } from "lucide-react";
import { useState } from "react";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Empty from "@/components/empty";
import Loader from "@/components/loader";

type ChatCompletionRequestMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const MusicPage = () => {
    const router = useRouter();
    const [music, setMusic] = useState<string>("");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });


    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {


        const response = await axios.post("/api/music", values);

        setMusic(response.data.audio);
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
        title = "Music Generation"
        description="Turn your prompt into music."
        Icon={MessageSquare}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
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
                                placeholder="Piano solo"
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
            
            {!music && !isLoading && (
                <div>
                    <Empty label="No music generated."/>
                </div>
            )}
            {music && (
                <audio controls className="w-full mt-8">
                    <source src={music} type="audio/mpeg"/>
                </audio>
            )}
        </div>
    </div>
</div>
  );
}

export default MusicPage;
