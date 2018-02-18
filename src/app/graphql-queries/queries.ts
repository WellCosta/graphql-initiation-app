import gql from 'graphql-tag'

export default {
  allTopics: gql`query {
    topics
    {
      name
      link
    }
  }`,
  allTopicsLike: gql`query($searchTerm: String!) {
    topicsLike(query:  $searchTerm)  {
      name
      link
    }
  }`
}
