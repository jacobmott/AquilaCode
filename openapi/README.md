openapi.spec.yaml is created from nest.js app.. 

via this code


```  
fs.writeFile("openapi/openapi.spec.yaml", data, (err) => {
    if (err) console.log(err);
    else {
      console.log(
        "openapi.spec.yaml file has been updated successfully\n",
      );
    }
  });
```


just run this to publish from the dist directory after you run the genreation of the sdk commands

```
npm publish
```


# Steps:

## login to npm
```
[5.2][512][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode/openapi]
$npm login
npm notice Log in on https://registry.npmjs.org/
Login at:
https://www.npmjs.com/login?next=/login/cli/123213213213213
Press ENTER to open in the browser...

Logged in on https://registry.npmjs.org/.
```

## Run openapi-generator-cli generate
```
npx openapi-generator-cli generate -i openapi.spec.yaml -g typescript-angular -o dist --additional-properties fileNaming=kebab-case,supportsES6=true,npmName=aquilacode-api,snapshot=false,ngVersion=18.1.0,npmVersion=2.0.0
```

## Build the project it generated
```
cd dist/
npm install
npm run build
```


## Upload that to npm
```
cd dist/
npm publish
```