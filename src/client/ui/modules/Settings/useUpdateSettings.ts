import { useToggleLangCase } from "@/client/application/useCases/useToggleLangCase";

/**
 * Custom hook to manage user settings updates, specifically for toggling language.
 *
 * @param {string} langCode - The language code to toggle to (e.g., 'en', 'fr').
 * @param {string} userId - The unique identifier of the user whose settings are being updated.
 * @returns {Object} An object containing:
 *   - handleUpdateSettings: A function that triggers the language toggle operation.
 *   - isLoading: A boolean indicating whether the toggle operation is currently in progress.
 */
export const useUpdateSettings = (langCode: string, userId: string) => {
  const { toggleLang, isLoading } = useToggleLangCase({ userId, langCode });

  const handleToggleLang = async () => {
    await toggleLang({ userId, langCode });
  }

  return { handleUpdateSettings: handleToggleLang, isLoading };
};