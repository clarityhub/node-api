# @clarityhub/node-api

[![npm version](https://badge.fury.io/js/%40clarityhub%2Fnode-api.svg)](https://badge.fury.io/js/%40clarityhub%2Fnode-api) [![Actions Status](https://github.com/clarityhub/node-api/workflows/test/badge.svg)](https://github.com/clarityhub/node-api/actions)


Clarity Hub API utilities for NodeJS. Includes our NLP APIs and Infer Model APIs.

* [Clarity Hub API](https://docs.clarityhub.io/apis/)
* [Clarity Hub Guides](https://docs.clarityhub.io/guides/)

## Installation

To install using npm:

```sh
npm i --save @clarityhub/node-api axios
```

## Usage

You will need a [Clarity Hub API account](https://www.clarityhub.io/api/). Once you have an account, you will need to [generate an access key](https://docs.clarityhub.io/guides/access-keys/create-access-key/).

```js
const clarityhub = require('@clarityhub/node-api')({
    accessKeyId: process.env.ACCESS_KEY_ID,
    accessKeySecret: process.env.ACCESS_KEY_SECRET,
});
```

The `clarityhub` object has `api` and `models` properties that you can access.

### Infer Models

A full example:

```js
const myModel = await clarityhub.models.create({
    name: 'human readable name',
    description: 'your model description',
});

await myModel.train([
    { utterance: 'hello world', label: 'greeting' },
    { utterance: 'good morning', label: 'greeting' },
    { utterance: 'how do I login', label: 'auth' },
    { utterance: 'how do I reset my password', label: 'auth' },
]);

const predictions = await myModel.predictSimilar('hi there');
console.log('predicted similar utterance', predictions[0]);

const predictions = await myModel.predictLabel('hi there');
console.log('predicted label', predictions[0]);
```

You can also get the labels from a model and update the label text:

```js
const labels = await myModel.getLabels();

console.log(labels.map((label) => {
    // userLabel is the user defined label
    // label is the model generated label
    return label.data.userLabel || label.data.label;
}));

// Override the text that the training model generated for this label
labels[0].update('override userLabel');
```

### API

The `clarityhub.api` object has all the raw requests you can make to the Clarity Hub API, including our NLP APIs:

* `clarityhub.api.nlp.sentiment(utterances: [String]): AxiosResponse`
* `clarityhub.api.nlp.toxicity(utterances: [String]): AxiosResponse`
* `clarityhub.api.nlp.topics(utterances: [String]): AxiosResponse`
* `clarityhub.api.nlp.embed(utterances: [String]): AxiosResponse`

The object also has the raw requests you can make for infer models:

* `clarityhub.api.models.getAll(): AxiosResponse`
* `clarityhub.api.models.create(payload: Object): AxiosResponse`
* `clarityhub.api.models.get(modelId: String): AxiosResponse`
* `clarityhub.api.models.update(modelId: String, payload: Object): AxiosResponse`
* `clarityhub.api.models.delete(modelId: String): AxiosResponse`

Model training APIs:

* `clarityhub.api.models.train(modelId: String, utterances: [Utterance]): AxiosResponse`

Model label APIs:

* `clarityhub.api.models.labels.getAll(modelId: String): AxiosResponse`
* `clarityhub.api.models.labels.get(modelId: String, labelId: String): AxiosResponse`
* `clarityhub.api.models.labels.update(modelId: String, labelId: String, payload: Object): AxiosResponse`

Model predict APIs:

* `clarityhub.api.models.predict.labels(modelId: String, utterances: [String]): AxiosResponse`
* `clarityhub.api.models.predict.similar(modelId: String, utterances: [String]): AxiosResponse`

For more specifics on the response data that these methods return, see our [Swagger Documentation](https://docs.clarityhub.io/apis/).

## License

This repo is MIT Licensed, see [LICENSE](../blob/master/LICENSE).
