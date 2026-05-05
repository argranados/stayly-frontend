import { Amplify } from 'aws-amplify'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_epeUpo1sN',
      userPoolClientId: 'v0saa3ijkqs9n0ojb8jtljspi',
      region: 'us-east-1',
    }
  }
})