import useSWRMutation from "swr/mutation";
import WordsService from "../services/WordsService";

export const useTranslation = () => {
  const { trigger, isMutating } = useSWRMutation(
    "/api/words",
    WordsService.makeTranslation
  );

  return { makeTranslation: trigger };
};
