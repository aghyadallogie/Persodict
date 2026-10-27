import { useToggleLangCase } from "@/client/application/useCases/useToggleLangCase";

/**
 * Custom hook to manage user settings updates, specifically for toggling language.
 *
 * @param {string} userId - The unique identifier of the user whose settings are being updated.
 * @returns {Object} An object containing:
 *   - handleUpdateSettings: A function that toggles the given language code.
 *   - isLoading: A boolean indicating whether the toggle operation is currently in progress.
 *   - error: The mutation error, if the last toggle failed.
 */
export const useUpdateSettings = (userId: string) => {
  const { toggleLang, isLoading, error } = useToggleLangCase({ userId });

  const handleUpdateSettings = async (langCode: string) => {
    await toggleLang({ userId, langCode });
  };

  return { handleUpdateSettings, isLoading, error };
};
