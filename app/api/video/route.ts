import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
});

export async function POST(
    req: Request
) {
    try {
    const { userId } = await auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    
    if (!prompt) {
        return new NextResponse("Prompt is required", { status: 400 });
    }


    const response = await replicate.run(
        "lucataco/hotshot-xl:78b3a6257e16e4b241245d65c8b2b81ea2e1ff7ed4c55306b511509ddbfd327a", 
        { 
            input: {
                seed: 6226,
                prompt: prompt
            } 
        }
    );

    return NextResponse.json(response);

    } catch (error) {
        console.log("[VIDEO_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
        
    }
}
