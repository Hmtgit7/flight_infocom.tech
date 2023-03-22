const express=require('express')
const router=express.Router();
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const dotenv = require('dotenv')


require("../config/db")
const User=require("../Models/userSchema")
dotenv.config({ path: './config.env' })  

router.use(cors());

router.post('/gpt', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0, // Higher values means the model will take more risks.
            max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
            top_p: 1, // alternative to sampling with temperature, called nucleus sampling
            frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        });

    } catch (error) {
        console.error(error)
        res.status(500).send(error || 'Something went wrong');
    }
})




router.get("/ping", (req, res) => {
    res.json({
        message: "ping",
    });
});
router.post("/chat", (req, res) => {
    const question = req.body.question;

    openai
        .createCompletion({
            model: "text-davinci-003",
            prompt: question,
            max_tokens: 4000,
            temperature: 0,
        })
        .then((response) => {
            console.log({ response });
            return response?.data?.choices?.[0]?.text;
        })
        .then((answer) => {
            console.log({ answer });
            const array = answer
                ?.split("\n")
                .filter((value) => value)
                .map((value) => value.trim());

            return array;
        })
        .then((answer) => {
            res.json({
                answer: answer,
                propt: question,
            });
        });
    console.log({ question });
});

// router.post("/ask", async (req, res) => {
//     const prompt = req.body.prompt;
//     try {
//         if (prompt == null) {
//             throw new Error("Uh oh, no prompt was provided");
//         }
//         const response = await openai.createCompletion({
//             model: "text-davinci-003",
//             prompt,
//         });
//         const completion = response.data.choices[0].text;
//         return res.status(200).json({
//             success: true,
//             message: completion,
//         });
//     } catch (error) {
//         console.log(error.message);
//     }
// });







router.get('/home',async(req,res)=>{
    try {
        const data = await User.find({});
        res.send(data);
        console.log(data);
    } catch (err) {
        console.log(err);
    }
})



router.post('/home', async(req, res) => {
    const { flightNumber, airline, destination, detail, terminal, gateNumber } = req.body;
    console.log(req.body)

    if (!flightNumber || !airline || !destination || !detail || !terminal || !gateNumber) {
        return res.status(422).json({ error: "please fill all the entries" });
    }

    try {
        const userExist = await User.findOne({ flightNumber: flightNumber });

        if(userExist){
            return res.status(422).json({ error: "Already exist" })
        }
        const user = new User({ flightNumber, airline, destination, detail, terminal, gateNumber })
        const userRegister=user.save()
        if (userRegister){
            res.status(201).json({ message: "new data added" });
        }else{
            res.status(500).json({ error: "failed to add data" })
        }
            
    } catch (error) {
        console.log(err)
    }
})





// router.post('/home' ,(req,res)=>{
//     const { flightNumber, airline, destination, detail, terminal, gateNumber }=req.body;  
//     console.log(req.body)

//     if (!flightNumber || !airline || !destination || !detail || !terminal || !gateNumber){
//         return res.status(422).json({error:"please fill all the entries"});
//     }

//     User.findOne({ flightNumber: flightNumber})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"Already exist"})
//         }
    

//     const user = new User({ flightNumber, airline, destination, detail, terminal, gateNumber })

//     user.save().then(()=>{
//         res.status(201).json({message:"new data added"});
//     }).catch((err)=>res.status(500).json({error:"failed to add data"}))

//     }).catch(err=>{console.log(err);});


//     // res.json({message:req})
// })








module.exports=router;