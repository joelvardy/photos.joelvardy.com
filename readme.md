# Photos by Joel Vardy

Website which simply reads from my 500px account and displays the photo with a link back to 500px.

### Deploy API

```
serverless deploy --aws-profile joelvardy
```

### Deploy Website

```
serverless client deploy --aws-profile joelvardy
aws cloudfront create-invalidation --distribution-id YYY --paths /index.html --profile=joelvardy
```
