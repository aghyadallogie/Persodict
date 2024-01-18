export const renderCorrectFlag = (lang: string) => {
  if (lang === "en") return "gb";
  if (lang === "sv") return "se";
  if (lang === "el") return "gr";
  if (lang === "ja") return "jp";
  if (lang === "uk") return "ua";
  return lang;
};
