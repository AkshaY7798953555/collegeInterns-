const express = require('express');
const app = express();
app.use(express.json());

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://Akshay:akshay7798953554@akshaydb.e6tjw4w.mongodb.net/project2self", {useNewUrlParser: true})
.then(() => console.log('mongoDB is connected'))
.catch(err => console.log(err));

const route = require('./routes/route');
app.use('/', route);

app.listen(3000, function() {
    console.log('app is running on 3000')
});