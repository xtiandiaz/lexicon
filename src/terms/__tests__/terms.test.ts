import fs from 'fs'
import { expect, test } from 'vitest'
import { resolve } from 'path'
import { termRegEx } from '../../rules'
import { cleanWord } from '../../utils'

function assertPredicateInAllRawTerms(predicate: (rawTerm: string, index: number, array: string[]) => void) {
  ['es', 'en'].forEach((langCode) => {
    const rawTerms = fs.readFileSync(resolve(__dirname, `../${langCode}.txt`)).toString('utf-8').split('\n')
    
    rawTerms.forEach((rawTerm, index, array) => {
      console.log(rawTerm)
      predicate(rawTerm, index, array)
    })
  })
}

test('Term Integrity', () => {
  assertPredicateInAllRawTerms((rawTerm, index, array) => {
    if (rawTerm.length > 0) {
      expect(termRegEx.test(rawTerm)).toBe(true)
    } else {
      expect(index === array.length - 1).toBe(true)
    }
  })
})

test('Term Unicity', () => {
  assertPredicateInAllRawTerms((rawTerm, index, array) => {
    if (index < array.length - 2) {
      const word = cleanWord(rawTerm.split(';')[0].split(',')[0])
      const nextRawTerm = array[index + 1]
      const regEx = new RegExp(`^${word}$`)
      
      expect(regEx.test(nextRawTerm)).toBe(false)
    }
  })
})
