import { Amplify } from 'aws-amplify';
import { events } from 'aws-amplify/data';
import config from '../amplify_outputs.json';

// Amplify.configure(config);

Amplify.configure({
    "API": {
      "Events": {
        "endpoint": "https://s6akv3c47ja3hh7s5ctvgx55my.appsync-api.us-east-1.amazonaws.com/event",
        "region": "us-east-1",
        "defaultAuthMode": "apiKey",
        "apiKey": "da2-*********************"
      }
    }
});

// Single event
await events.post('/esp32/sub', {some: "ON1"});

// Multiple events
// await events.post('/default/test', [{some: 'data'}, {and: 'data'}, {more: 'data'}]);