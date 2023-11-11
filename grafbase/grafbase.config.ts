import { g, auth, config } from "@grafbase/sdk";

// const authProvider = auth.OpenIDConnect({
//   issuer: process.env.ISSUER_URL ?? ''
// })
//
// Define Data Models
// https://grafbase.com/docs/database

// @ts-ignore
const User = g
  .model("User", {
    name: g.string().length({ min: 2, max: 100 }),
    email: g.string().unique(),
    avatarUrl: g.url(),
    description: g.string().length({ min: 2, max: 1000 }).optional(),
    githubUrl: g.url().optional(),
    linkedinUrl: g.url().optional(),
    projects: g
      .relation(() => Project)
      .name('created')
      .list()
      .optional(),  
    likedProjectIds: g   //list of liked project id
      .string().list()
      .optional(),
    
  })
  .auth((rules) => {
    rules.public().read();
    rules.private().update().delete();
  });

// @ts-ignore
const Project = g
  .model("Project", {
    title: g.string().length({ min: 3 }),
    description: g.string(),
    image: g.url(),
    liveSiteUrl: g.url(),
    githubUrl: g.url(),
    category: g.string().search(),
    views: g.int().default(0), 
    likes: g.int().default(0), 
    createdBy: g.relation(() => User).name('created').optional(),
  })
  .auth((rules) => {
    rules.public().read();
    rules.private().create().update().delete();
  });

const jwt = auth.JWT({
  issuer: "grafbase",
  secret: g.env("NEXTAUTH_SECRET"),
});

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
