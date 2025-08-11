const express = require("express");
const app = express();
const nodemailer = require("nodemailer")
const path = require("path");
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.set("view engine", "ejs");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "shubham481582@gmail.com",
        pass: "dgepdtazypobvlrm"
    }
}) 

app.post("/send-email",async(req, res)=>{
    const {to, subject, text} = req.body

    try{
        const info = await transporter.sendMail({
            from: '"Shubham" <shubham481582@gmail.com>',
            to: to,
            subject: subject,
            text: text,

            attachments: [
                {
                    filename: "Final CV.pdf",
                    path: path.join(__dirname, "files","Final CV.pdf")
                }
            ]
        })

        res.json({ message: "Email send succsessfully", info})
    }
    catch(error){
        res.status(500).json({ message: "Failed to send email", error})
    }

})


app.get("/",(req, res)=>{
    res.render("mailpage.ejs");
});

app.listen(port, () =>{
    console.log(`Server is runing at http://localhost:${port}`);
})