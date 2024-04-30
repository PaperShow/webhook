const express = require("express")
const app = express();
const port = 3000

app.use(express.json())
// app.use(express.urlencoded(true))

app.post('/pay/callback',(req, res)=>{
    const data = req.body;
    console.log('Received payment event:', data);
    res.status(200).json(data);
})

app.listen(port, ()=>{
    console.log(`server is listening at this`);
})