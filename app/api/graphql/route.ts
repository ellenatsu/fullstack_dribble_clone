//access by /api/graphql
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import mergedTypeDefs from '@/typeDefs';
import { connectDB } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/session';



const server = new ApolloServer({
  resolvers,
  typeDefs: mergedTypeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => {
        //next auth and db
        const session = await getCurrentUser();
        const db = await connectDB();
        
        return { session, db };
      },
  });

export { handler as GET, handler as POST };