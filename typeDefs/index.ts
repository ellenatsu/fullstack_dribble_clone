import { mergeTypeDefs } from "@graphql-tools/merge";

import userTypeDef from "./user.typeDef.js";
import projectTypeDef from "./project.typeDef.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDef, projectTypeDef]);

export default mergedTypeDefs;