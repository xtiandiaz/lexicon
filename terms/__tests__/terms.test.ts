import { expect, test } from 'vitest'
import { resolve } from 'path'
import { termRegEx } from '../../rules'
import fs from 'fs'

test('Term Integrity', () => {
  ['es', 'en'].forEach((langCode) => {
    const rawTerms = fs.readFileSync(resolve(__dirname, `../${langCode}.txt`)).toString('utf-8').split('\n')
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
