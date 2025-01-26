import { useGetUserTranslations } from "@/client/application/useCases/useGetUserTranslations";
import { useSession } from "next-auth/react";
import type { Word } from "@/client/domain/entities/Word";

/**
 * Custom hook to retrieve and manage user translation history.
 *
 * This hook utilizes the session information to fetch user-specific translations
 * and returns them in an ordered format. If the translations support a reverse
 * operation, it will return them in reversed order.
 *
 * @returns {Object} An object containing the ordered translations.
 * @returns {Word[]} orderedTranslations - The list of ordered translations for the user.
 */
export const useHistory = () => {
    const { data: session, status } = useSession();
    const { userTranslations, isLoading } = useGetUserTranslations(session?.user?.email as string, status);

    const translations = userTranslations?.data || [];
    let orderedTranslations: Word[] = translations || [];

    if (typeof translations.toReversed === "function")
        orderedTranslations = translations.toReversed();

    return { orderedTranslations, isLoading }
}