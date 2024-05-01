import { useUpdateSettingsCase } from "@/client/application/useCases/useUpdateSettings";

export const useUpdateSettings = (langCode: string, userLangs: string[]) => {
  const { updateSettings } = useUpdateSettingsCase();

  const handleUpdateSettings = async () => {
    let payload;
    if (userLangs.includes(langCode)) {
      userLangs = userLangs.filter((langItem: string) => {
        return langItem !== langCode;
      });
      payload = { userId: "aghy", userLangs };
      console.log({payload});
    } else {
      userLangs.push(langCode);
      payload = { userId: "aghy", userLangs };
      console.log({payload});
    }

    await updateSettings(payload);
  };

  return { handleUpdateSettings };
};
