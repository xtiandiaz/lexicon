import { Language } from "./types"

export const termRegEx = (language: Language): RegExp => {
  switch (language) {
    case Language.English:
      return /^(([\s\-]?[\wàéï]+[\s\-]?)+,?\s?)+$/
    case Language.Finnish:
      return /^(([\s\-]?[\wäÄöÖ\/()+]+[\s\-]?)+,?\s?)+$/
    case Language.Spanish:
      return /^(([\s\-]?[\wáÁàéÉíÍóÓúÚüñÑ()]+[\s\-]?)+,?\s?)+$/
  }
}
