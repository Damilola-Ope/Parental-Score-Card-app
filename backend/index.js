//importing mongoose and express and the Custom Model
const express = require('express')
const mongoose = require('mongoose');
const User = require('./models/userinfo.model.js')
const cors = require('cors')
const userRoute = require('./routes/user.route.js')//
const app = express()


const port = process.env.PORT || 3000;

// configuring middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
  origin: ["http://localhost:3000","http://127.0.0.1:5500","https://damilola-ope.github.io/Parental-Score-Card-app"]
}));

//routes
app.use('/api/users', userRoute)

//.send is what displays on the broswer
app.get('/', (req, res)=>{
  res.send("hello from Node API");
})

//connecting to the backend database
mongoose.connect("mongodb+srv://danielope62:dIBI53cwBMNbJNKX@userinfodb.7pfk4wx.mongodb.net/?retryWrites=true&w=majority&appName=UserinfoDB")
.then(()=>{
  console.log('Connected to the database!')

  //hosting the server
  app.listen(port, ()=>{
    console.log('Server is running on port 3000')
  })
})
.catch(()=>{
  console.log('connection Failed')
})
