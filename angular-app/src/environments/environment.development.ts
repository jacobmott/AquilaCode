export const environment = {
  production: false,
  //BACKEND_URL: "http://localhost:8081", // You should update this with your actual backend port if it is different.
  // basepath: "http://localhost/api",
  // basepath: "http://api/backend/aquila",
  // api is the name of the apio service in the docker compose file, so we can referencve it that way
  // backend is in the ngxinx config file, so we can reference it that way
  // WARNING you cant actually use the docker service name at this level, so we cant us api, we need to use localhost
  //Use this when testing locally
  // basepath: "http://localhost/backend/aquila",
  //Use this for procudtion
  basepath: "https://aquilacode.io/backend/aquila",
};
