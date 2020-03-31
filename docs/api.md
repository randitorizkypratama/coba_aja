# API

Everything that is related to the API should be placed in the `api` folder. Each file should represent a specific domain and each file name should have a suffix `*.api.ts`.

You can access the API methods with this syntax:

`this.$api.get(url)`

`this.$api.post(url, requestBody)`

`this.$api.put(url, requestBody)`

`this.$api.delete(url)`

The value of `requestBody` can be a plain object (`{}`) to automatically set the content-type into `application/json`.

These functions will return an array with two elements. Where the first index is the error object and the second element is the response's data.
For example:

```js
const response = await this.$api.get('dummyURL');

if (response[0]) {
  // handle error
} else {
  // handle success
}
```

But the best way to do this is to use destructuring array like the following:

```js
const [err, response] = await this.$api.get('dummyURL');

if (err) {
  // handle error
} else {
  // handle success
}
```
