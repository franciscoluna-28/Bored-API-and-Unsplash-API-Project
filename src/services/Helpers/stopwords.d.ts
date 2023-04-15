declare module 'stopwords-json' {
  interface Stopwords {
    [lang: string]: string[]
  }

  const stopwords: Stopwords
  export default stopwords
}
