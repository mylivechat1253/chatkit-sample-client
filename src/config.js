const auth0Domain = 'dev-5nups0wd.auth0.com'
const auth0ClientID = '2j5b1b2L8Fn9BIvDbWDWijzAPaiQKksB'
const auth0RedirectUri = 'https://chatkit-demo.netlify.com/'
// const auth0RedirectUri = 'http://localhost:3000' /* Testing locally */

const chatkitTokenProviderEndpoint = '.netlify/functions/token'

const chatkitInstanceLocator = 'v1:us1:d34fed07-c293-4ede-8fa1-e726951533a9'

export { auth0Domain, auth0ClientID, auth0RedirectUri, chatkitTokenProviderEndpoint, chatkitInstanceLocator }
