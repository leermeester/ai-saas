import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabaseClient";
import { MAX_FREE_COUNTS } from "@/constants";

export const increaseApiLimit = async () => {
    const { userId } = await auth();

    if (!userId) {
        return;
    }

    const { data: existingLimit, error: selectError } = await supabase
        .from('UserApiLimit')
        .select('count')
        .eq('userId', userId)
        .single();

    if (selectError && selectError.code !== 'PGRST116') {
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

export const checkApiLimit = async () => {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    const { data: userApiLimit, error } = await supabase
        .from('UserApiLimit')
        .select('count')
        .eq('userId', userId)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching API limit:', error.message);
        return false;
    }

    return !userApiLimit || userApiLimit.count < MAX_FREE_COUNTS;
};