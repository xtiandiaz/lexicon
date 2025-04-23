import { expect, test } from 'vitest'
import { termRegEx } from '../../rules'
import FS from 'fs'

test('Term Integrity', () => {
  ['en', 'es'].forEach((langCode) => {
    const rawTerms = FS.readFileSync(`terms/${langCode}.txt`).toString('utf-8').split('\n')
    rawTerms.forEach((rawTerm, index) => {
      console.log(rawTerm)
      if (rawTerm.length > 0) {
        expect(termRegEx.test(rawTerm)).toBe(true)
      } else {
        expect(index === rawTerms.length - 1).toBe(true)
      }
    })  
  })
})
