const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path=require('path');

const Razorpay=require("razorpay");
const cors=require("cors");


app.use(express.json());
app.use(cors());

app.get("/file",(req,res)=>{
    res.sendFile(path.join(_dirname,'/public/index.html'));
});
app.get("/",(req,res)=>{
    res.send('Hiii');
    res.end();
});
app.post("/payment", async (req, res)=>{
    let {amount}=req.body;

    var instance = new Razorpay({ key_id: 'rzp_test_Bo9oZ7LjeoAkeF', key_secret: 'Vjfl0DiiEMPqYplL7zxNKC84' });

    let order=await instance.orders.create({
        amount: amount*100,
        currency: "INR",
        receipt: "receipt#1",
        })
        res.status(201).json({
            success:true,
            order,
            amount,
        });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
