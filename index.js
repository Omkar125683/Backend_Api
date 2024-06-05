const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const express = require("express");
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());
app.post("/", async(req, res) => {
  try {
        const {pro}= req.body;
      
      const prompt = pro;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
    
  
    return res.status(200).json({
        sucess:true,
        msg:text,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
        sucess:false,
      msg: err,
    });
  }
});
app.listen(3000,()=>{
    console.log('server started');
})