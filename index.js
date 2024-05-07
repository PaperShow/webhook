const express = require("express")
const app = express();
const port = 3000
var admin = require("firebase-admin");

var serviceAccount = require("./mywaytrading-4165a-firebase-adminsdk-pgwo7-23697fb442.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mywaytrading-4165a.firebaseio.com"
});

app.use(express.json())
// app.use(express.urlencoded(true))

app.get('/', (req, res)=>{
    console.log("Hello Dada!!")
})

app.post('/pay/callback/:id',async (req, res)=>{
    const data = req.body;
    const uid = req.params.id;
    
    // decoding the base 64 response
    let base64 = data["response"]
    let bufferObj = Buffer.from(base64, "base64")
    let decodedResponse = bufferObj.toString("utf8")

    var final = JSON.parse(decodedResponse);

    // adding the uid in the Json for uploading to the Firebase
    final.uid = uid;

    // var success = final["success"]
    // console.log('status:', success);

    // adding data to firebase
    await admin.firestore().collection('payment').add(final).catch((error)=>{
        res.statusCode(404).json(error)
        console.log(error);
    })
    // console.log('Received payment event:', final);
    res.status(200).send(final)
})

app.listen(port, ()=>{
    console.log(`server is listening at this`);
})