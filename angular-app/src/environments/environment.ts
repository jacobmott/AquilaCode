import { domain, clientId } from "../../auth_config.json";

export const environment = {
  production: true,
  //BACKEND_URL: "http://192.168.1.154:8081",
  // basepath: "http://localhost/api",
  // basepath: "http://api/api",
  // basepath: "http://api/backend/aquila",
  // api is the name of the apio service in the docker compose file, so we can referencve it that way
  // backend is in the ngxinx config file, so we can reference it that way
  // WARNING you cant actually use the docker service name at this level, so we cant us api, we need to use localhost
  //Use this when testing locally
  // basepath: "http://localhost:3000/aquila",
  //Use this for procudtion
  basepath: "https://aquilacode.io/backend/aquila",
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
  },
};
