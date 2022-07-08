import { importSchema } from "graphql-import";
import path from "path";

const typeDefs = importSchema(path.join(__dirname, "../../graphql/schema.graphql"));

export { typeDefs };
