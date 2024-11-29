import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    const user = await auth();
    const userId = user.userId;

    if (!userId) {
        return false;
    }

    const userSubscription = await prisma.userSubscription.findUnique({
        where: {    
            userId: userId
        },
        select: {
            stripeSubscriptionId: true,
            stripePriceId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
        },
    });

    if (!userSubscription) {
        return false;
    }

    const isValid = 
        userSubscription.stripePriceId &&
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return !!isValid;
}