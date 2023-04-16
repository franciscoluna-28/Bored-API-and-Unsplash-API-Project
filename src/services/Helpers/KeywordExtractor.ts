import natural, { LancasterStemmer } from 'natural'
import { Activity } from '../../routes/types'
import * as stopword from 'stopword'

const language = 'EN'
const defaultCategory = 'N'
const lexicon = new natural.Lexicon(language, defaultCategory)
const ruleSet = new natural.RuleSet('EN')

export function getBestKeyword (activity: Activity): string {
  // Tokeniza la actividad y remueve palabras vacías (stopwords)
  const tokenizer = new natural.RegexpTokenizer({ pattern: / / })
  const tokens = tokenizer.tokenize(activity.activity.toLowerCase())
  const filteredTokens = stopword.removeStopwords(tokens, stopword.en)

  const tagger = new natural.BrillPOSTagger(lexicon, ruleSet)
  const taggedSentence = tagger.tag(filteredTokens)
  const taggedWords = taggedSentence.taggedWords
  const nouns = taggedWords.filter(({ tag }) => tag.match(/^NN/)).map(({ token }) => token)
  const verbs = taggedWords.filter(({ tag }) => tag.match(/^VB/)).map(({ token }) => token)

  console.log(nouns)
  console.log(verbs)

  // Si no hay nombres, usar verbos
  const tokensToConsider = nouns.length > 0 ? nouns : verbs

  // Cuenta la frecuencia de cada token y devuelve el más común
  const frequencies: Record<string, number> = {}
  let maxFrequency = 0
  let bestToken = ''
  for (const token of tokensToConsider) {
    const stemmedToken = LancasterStemmer.stem(token)
    if (!(stemmedToken in frequencies)) {
      frequencies[stemmedToken] = 1
    } else {
      frequencies[stemmedToken]++
    }
    if (frequencies[stemmedToken] > maxFrequency) {
      maxFrequency = frequencies[stemmedToken]
      bestToken = stemmedToken
    }
  }
  return bestToken
}
