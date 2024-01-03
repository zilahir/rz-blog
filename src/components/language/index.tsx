import { ReactElement } from "react";

import type { Language as LanguageType } from "../../types/Post";

interface ILanguage {
  language: LanguageType;
}

function languageToEmoji(lang: LanguageType): string {
  if (lang === "en") {
    return "🇬🇧";
  }
  if (lang === "hu") {
    return "🇭🇺";
  }
  if (lang === "fin") {
    return "🇫🇮";
  }

  return "🏳️‍🌈";
}

function Language({ language }: ILanguage): ReactElement {
  return (
    <div>
      <p>{languageToEmoji(language)}</p>
    </div>
  );
}

export default Language;
