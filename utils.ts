export function cleanWord(word: string): string {
  const matches = /^(\s)?[\S\s]+\S+(\s)?$/m.exec(word)
  // console.log(`Word '${word}' cleaning; matches:`, matches)
  
  if (matches) {
    if (matches[1]) {
      word = word.slice(matches[1].length)
    }
    if (matches[2]) {
      word = word.slice(-matches[2].length)
    }
  }
  
  return word
}
