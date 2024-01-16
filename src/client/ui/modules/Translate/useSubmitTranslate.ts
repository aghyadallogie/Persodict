import { useTranslation } from "@/client/application/useCases/useTranslation";
import { FormEvent } from "react";

export const useSubmitTranslate = () => {
  const { makeTranslation } = useTranslation();

  const handleSubmit = async (event: FormEvent) => {
    event?.preventDefault();
    await makeTranslation({
      authorId: 'aghy',
      text: event.target[0].value
    });
  };

  return { handleSubmit };
};
