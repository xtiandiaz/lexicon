import fs from 'fs'
import { expect, test } from 'vitest'
import { resolve } from 'path'
import { termRegEx } from '../../rules'
import { cleanWord } from '../../utils'
import { Language } from '../../types'

function assertPredicateInAllRawTerms(predicate: (rawTerm: string, index: number, array: string[], language: Language) => void) {
  Object.values(Language).forEach((lang) => {
    const rawTerms = fs.readFileSync(resolve(__dirname, `../${lang}.txt`)).toString('utf-8').split('\n')
    
    rawTerms.forEach((rawTerm, index, array) => {
      predicate(rawTerm, index, array, lang)
    })
  })
}

test('Term Integrity', () => {
  assertPredicateInAllRawTerms((rawTerm, index, array, lang) => {
    if (rawTerm.length > 0) {
      const expectation = termRegEx(lang).test(rawTerm)
      
      if (!expectation) {
        console.log(rawTerm)
      }
      
      expect(expectation).toBe(true)
    } else {
      expect(index === array.length - 1).toBe(true)
    }
  })
})

test('Term Unicity', () => {
  assertPredicateInAllRawTerms((rawTerm, index, array) => {
    if (index < array.length - 2) {
      const word = cleanWord(rawTerm.split(',')[0])
      const nextRawTerm = array[index + 1]
      const regEx = new RegExp(`^${word}([,\s]+)?$`)
      const expectation = !regEx.test(nextRawTerm)
      
      if (!expectation) {
        console.log(rawTerm)
      }
      
      expect(expectation).toBe(true)
    }
  })
})
