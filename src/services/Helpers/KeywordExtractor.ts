import natural, { LancasterStemmer } from 'natural'
import { Activity } from '../../routes/types'
import * as stopword from 'stopword'
const language = 'EN'
const defaultCategory = 'N'
const lexicon = new natural.Lexicon(language, defaultCategory)
const ruleSet = new natural.RuleSet('EN')

export function getBestKeyword (activity: Activity): string {
  // Tokeniza la actividad y remueve palabras vacías (stopwords)

  const tokenizer = new natural.WordTokenizer()
  const tokens = tokenizer.tokenize(activity.activity.toLowerCase())
  const filteredTokens = stopword.removeStopwords(tokens, stopword.en)

  const tagger = new natural.BrillPOSTagger(lexicon, ruleSet)
  const taggedSentence = tagger.tag(filteredTokens)
  const taggedWords = taggedSentence.taggedWords
  const nouns = taggedWords.filter(({ tag }) => tag.match(/^NN/)).map(({ token }) => token)

  console.log(nouns)

  // Cuenta la frecuencia de cada token y devuelve el más común
  const frequencies: Record<string, number> = {}
  let maxFrequency = 0
  let bestToken = ''
  for (const noun of nouns) {
    const stemmedNoun = LancasterStemmer.stem(noun)
    if (!(stemmedNoun in frequencies)) {
      frequencies[stemmedNoun] = 1
    } else {
      frequencies[stemmedNoun]++
    }
    if (frequencies[stemmedNoun] > maxFrequency) {
      maxFrequency = frequencies[stemmedNoun]
      bestToken = stemmedNoun
    }
  }
  return bestToken
}
