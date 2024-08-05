export default {
  //Local development
  mongoURI: "mongodb://localhost:27017",
  mongoDbName: "admin",
  mongoDbUser: "admin",
  mongoDbPass: "admin",
  //Production
  // mongoURI: process.env.DATABASE_URL, // "mongodb://admin:admin@127.0.0.1:27017/AquilaCode",
  // mongoDbName: process.env.DATABASE_NAME,
  // mongoDbUser: process.env.DATABASE_USER,
  // mongoDbPass: process.env.DATABASE_PASS,
};
