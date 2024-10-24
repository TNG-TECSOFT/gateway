export const userQueries = {
  queries: {
    getUserAuth: `
      query
      getUserAuth($permissions: [String!]!, $apiName: String!) {
        getUserAuth(permissions: $permissions, apiName: $apiName )
      }`,
    getNamesByIds: `
      query
      getNamesByIds($ids: [String!]!) {
        getNamesByIds(ids: $ids){fullName}
      }`,
    getUserData: `
        {getUserData{id, fullName, email}}
      `,
    getUserAuthV2: `
      query
      getUserAuthV2($permissions: [JSON!], $apiName: String!) {
        getUserAuthV2(permissions: $permissions, apiName: $apiName )
      }`,
  },
  mutations: {},
};
