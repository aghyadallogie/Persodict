import useSWR from "swr";
import WordsService from "../services/WordsService";
import type { Word } from "@/client/domain/entities/Word";

export const useGetUserTranslations = (wordData: Word[] = []) => {
  const { data } = useSWR("/api/words", WordsService.getUserTranslations, {
    fallbackData: {
      data: wordData,
      status: "test",
    },
  });

  return { userTranslations: data };
};
