import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabaseClient";
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

    // Fetch existing API limit
    const { data: existingLimit, error: selectError } = await supabase
        .from('UserApiLimit')
        .select('count')
        .eq('userId', userId)
        .single();

    if (selectError && selectError.code !== 'PGRST116') { // 'PGRST116' indicates no rows found
        console.error('Error fetching API limit:', selectError.message);
        return;
    }

    if (existingLimit) {
        // Update existing record
        const { error: updateError } = await supabase
            .from('UserApiLimit')
            .update({ count: existingLimit.count + 1 })
            .eq('userId', userId);

        if (updateError) {
            console.error('Error updating API limit:', updateError.message);
        }
    } else {
        // Create new record
        const { error: insertError } = await supabase.from('UserApiLimit').insert({
            userId,
            count: 1,
        });

        if (insertError) {
            console.error('Error inserting API limit:', insertError.message);
        }
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

        const { data: userApiLimit, error } = await supabase
            .from('UserApiLimit')
            .select('count')
            .eq('userId', userId)
            .single();

        if (error && error.code === 'PGRST116') {
            // User doesn't exist yet, create a new entry
            const { error: insertError } = await supabase
                .from('UserApiLimit')
                .insert({
                    userId,
                    count: 0
                });

            if (insertError) {
                console.error('Error creating new user API limit:', insertError.message);
            }
            return 0;
        }

        if (error) {
            console.error('Error fetching API limit count:', error.message);
            return 0;
        }

        return userApiLimit?.count ?? 0;
    } catch (error) {
        console.error('Error in getApiLimitCount:', error);
        return 0;
    }
};
