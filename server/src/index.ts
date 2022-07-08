import "module-alias/register";
const { ApolloServer } = require("apollo-server");
import { typeDefs } from "./schema/type-defs";
import { resolvers } from "./schema/resolvers";

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: { url: string }) => {
  console.log(`YOUR API IS RUNNING AT: ${url} :)`);
});
