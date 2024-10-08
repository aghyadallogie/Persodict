import useSWR from "swr";
import WordsService from "@/client/application/services/WordsService";

export const useGetUserTranslations = (authorId: string) => {
  const fetcher = () => WordsService.getUserTranslations(authorId);

  const { data, error } = useSWR("/api/words", fetcher, {
    fallbackData: {
      data: [],
      status: "test",
    },
  });

  return { userTranslations: data, error };
};