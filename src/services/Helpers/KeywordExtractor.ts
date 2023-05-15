import natural from 'natural'
import { Activity } from '../../routes/types'
import * as stopword from 'stopword'

// Setting up the language, lexicon and basic rule sets
const language = 'EN'
const defaultCategory = 'N'
const lexicon = new natural.Lexicon(language, defaultCategory)
const ruleSet = new natural.RuleSet('EN')

export function getBestKeyword (activity: Activity): string {
  // Dividing the activity into words and ignoring stopwords (tokenizing)
  const tokenizer = new natural.RegexpTokenizer({ pattern: / / })
  const tokens = tokenizer.tokenize(activity.activity.toLowerCase())
  const filteredTokens = stopword.removeStopwords(tokens, stopword.eng)

  // Filtering the obtained tokens
  const tagger = new natural.BrillPOSTagger(lexicon, ruleSet)
  const taggedSentence = tagger.tag(filteredTokens)
  const taggedWords = taggedSentence.taggedWords
  const nouns = taggedWords.filter(({ tag }) => tag.match(/^NN/)).map(({ token }) => token)
  const verbs = taggedWords.filter(({ tag }) => tag.match(/^VB/)).map(({ token }) => token)

  console.log(nouns)
  console.log(verbs)

  const tokensToConsider = nouns.length > 0 ? nouns : verbs

  const frequencies: Record<string, number> = {}
  let maxFrequency = 0
  let bestToken = ''
  for (const token of tokensToConsider) {
    if (!(token in frequencies)) {
      frequencies[token] = 1
    } else {
      frequencies[token]++
    }
    if (frequencies[token] > maxFrequency) {
      maxFrequency = frequencies[token]
      bestToken = token
    }
  }
  return bestToken
}
