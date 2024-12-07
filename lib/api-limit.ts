import { auth } from "@clerk/nextjs/server";
import { MAX_FREE_COUNTS } from "@/constants";
import prismadb from "./prismadb";

/**
 * Increases the API limit count for the authenticated user.
 */
export const increaseApiLimit = async () => {
    const { userId } = await auth();

    if (!userId) {
        return;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: { userId },
    });

    if (userApiLimit) {
        // Update existing record
        await prismadb.userApiLimit.update({
            where: { userId },
            data: { count: userApiLimit.count + 1 },
        });
    } else {
        // Create new record
        await prismadb.userApiLimit.create({
            data: { userId, count: 1 },
        });
    }
};

/**
 * Checks if the user has remaining API calls available.
 * @returns {Promise<boolean>} - Returns true if the user can make more API calls.
 */
export const checkApiLimit = async (): Promise<boolean> => {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
        return true;
    } else {
        return false;
    }
};

/**
 * Retrieves the current API limit count for the authenticated user.
 * @returns {Promise<number>} - The current API count.
 */
export const getApiLimitCount = async (): Promise<number> => {
    try {
        const { userId } = await auth();

        if (!userId) {
            return 0;
        }

        const userApiLimit = await prismadb.userApiLimit.findUnique({
            where: { userId },
            select: { count: true },
        });

        if (!userApiLimit) {
            // User doesn't exist yet, create a new entry
            await prismadb.userApiLimit.create({
                data: {
                    userId,
                    count: 0,
                },
            });
            return 0;
        }

        return userApiLimit.count;
    } catch (error) {
        console.error('Error in getApiLimitCount:', error);
        return 0;
    }
};
