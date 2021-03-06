 function (user, context, callback) {
  
    if(context.stats.loginsCount > 1 || context.protocol === 'oauth2-refresh-token') {
      console.log("Ignoring the user creation step");
      return callback(null, user, context);
    }
    
    //const CHATKIT_INSTANCE_ID = configuration.chatkitInstanceLocator.split(':')[2];
    //const CHATKIT_KEY_ID = configuration.chatkitSecret.split(':')[0]; 
    //const CHATKIT_KEY_SECRET = configuration.chatkitSecret.split(':')[1];
    //const CHATKIT_API_BASE = 'https://us1.pusherplatform.io/services/chatkit/v2';
    //const ADD_USERS_TO_ROOM_ENDPOINT = `${CHATKIT_API_BASE}/${CHATKIT_INSTANCE_ID}/rooms/${configuration.chatkitRoomId}/users/add`;
  const CHATKIT_INSTANCE_ID = 'd34fed07-c293-4ede-8fa1-e726951533a9';
  const CHATKIT_KEY_ID = '41438ca0-8296-43e9-9cca-38836e1b98be'; 
  const CHATKIT_KEY_SECRET = 'pu7MOMNFIYGNmd1h3Q1y1TN1QMq2O0ZyfuL9/5P8VwY=';
  const CHATKIT_API_BASE = `https://us1.pusherplatform.io/services/chatkit_token_provider/v1`;
  const ADD_USERS_TO_ROOM_ENDPOINT = `${CHATKIT_API_BASE}/${CHATKIT_INSTANCE_ID}/rooms/${configuration.chatkitRoomId}/users/add`;
   
    const request = require('request');
    const jwt = require('jsonwebtoken');
    
    const minute = 60;
    const nowSeconds = Math.floor(Date.now() / 1000);
  
    const jwtPayload = {
      instance: CHATKIT_INSTANCE_ID,
      iss: `api_keys/${CHATKIT_KEY_ID}`,
      iat: nowSeconds,
      exp: nowSeconds +  minute,
      su:  true
    };
  
    let token = jwt.sign(jwtPayload, CHATKIT_KEY_SECRET);
    console.log(token);
    
    const headers = {  
      "content-type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    
    const payload = {
      "user_ids": [user.email]
    };
    
    request.put({ 
      uri: ADD_USERS_TO_ROOM_ENDPOINT,
      json: true,
      body: payload,
      headers: headers
  }, ( error, response, body )  => {
      
      if(error) {
        callback(error, user, context);
      }
  
      console.log(response.statusCode);
      console.log(response.body);
      
      callback(null, user, context);
  });  
  
}
