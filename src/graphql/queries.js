/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRank = `query GetRank($id: ID!) {
  getRank(id: $id) {
    id
    name
    score
  }
}
`;
export const listRanks = `query ListRanks(
  $filter: ModelRankFilterInput
  $limit: Int
  $nextToken: String
  
) {
  listRanks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      score
    }
    nextToken
  }
}
`;
