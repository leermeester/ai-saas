import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { CreateChatCompletionRequestMessage } from "openai/resources/index.mjs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });


const instructionMessage: CreateChatCompletionRequestMessage = {
    role:"system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."

}

export async function POST(
    req: Request
) {
    try {
    const { userId } = await auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!process.env.OPENAI_API_KEY) {
        return new NextResponse("OpenAI API key not configured", { status: 500 });
    }
    
    if (!messages) {
        return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [instructionMessage, ...messages],
    });

    return NextResponse.json(response.choices[0].message);

    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
        
    }
}
