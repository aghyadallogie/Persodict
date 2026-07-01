import useSWR from "swr";
import WordsService from "@/client/application/services/WordsService";

/**
 * Hook to fetch translations for a specific user using SWR.
 *
 * @param {string} authorId - The ID of the user whose translations are being fetched.
 *
 * @returns {Object} Contains:
 * - `userTranslations` (Array|undefined): List of user translations or undefined while loading.
 * - `isError` (Error|undefined): Error object if fetching failed.
 * - `isLoading` (boolean): `true` if data is loading, `false` otherwise.
 *
 * @example
 * const { userTranslations, isError, isLoading } = useGetUserTranslations("userId123");
 */
export const useGetUserTranslations = (authorId: string) => {
  const { data, error } = useSWR(
    `/api/words?authorId=${authorId}`,
    () => WordsService.getUserTranslations(authorId)
  );

  return {
    userTranslations: data,
    isError: error,
    isLoading: !error && !data,
  };
};