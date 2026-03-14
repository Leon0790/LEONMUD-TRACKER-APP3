const axios = require("axios")

async function sendSMS(){

await axios.post(
"https://api.africastalking.com/version1/messaging",
{
username:"sandbox",
to:"254700938979",
message:"You have logged into LEONMUD Tracker"
},
{
headers:{
apiKey:"YOUR_SMS_API_KEY",
"Content-Type":"application/json"
}
}
)

}

module.exports = sendSMS
