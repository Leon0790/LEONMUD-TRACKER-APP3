const express = require("express")
const cors = require("cors")
const axios = require("axios")
const bodyParser = require("body-parser")

const app = express()

app.use(cors())
app.use(bodyParser.json())

const consumerKey = "YOUR_MPESA_CONSUMER_KEY"
const consumerSecret = "YOUR_MPESA_SECRET"
const shortCode = "174379"
const passKey = "YOUR_PASSKEY"

const teacherPhone = "2547XXXXXXXX"

async function getToken(){

const auth = Buffer.from(consumerKey+":"+consumerSecret).toString("base64")

const res = await axios.get(
"https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
{
headers:{Authorization:"Basic "+auth}
})

return res.data.access_token
}

app.post("/pay",async(req,res)=>{

try{

const token = await getToken()

const timestamp = new Date().toISOString().replace(/[-:.TZ]/g,"").slice(0,14)

const password = Buffer.from(shortCode+passKey+timestamp).toString("base64")

await axios.post(
"https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
{
BusinessShortCode:shortCode,
Password:password,
Timestamp:timestamp,
TransactionType:"CustomerPayBillOnline",
Amount:10,
PartyA:teacherPhone,
PartyB:shortCode,
PhoneNumber:teacherPhone,
CallBackURL:"https://yourdomain.com/callback",
AccountReference:"LEONMUD",
TransactionDesc:"Tracker access"
},
{
headers:{Authorization:"Bearer "+token}
})

res.json({message:"M-Pesa prompt sent"})

}catch(e){

res.status(500).json(e.message)

}

})
