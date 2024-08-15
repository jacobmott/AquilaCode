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