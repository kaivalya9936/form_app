const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { ObjectId } = require('mongodb');

app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://127.0.0.1:27017/form_app', { useNewUrlParser: true });
mongoose.set('strictQuery', true);

const userSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    joined: {type: Date, default: Date.now()}
});

const adminSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    joined: {type: Date, default: Date.now()}
});


const questionSchema = new mongoose.Schema({
    question: {
      type: String,
    },
    options: [String],
  });
  
const formSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    questions: [questionSchema],
  });

const responseSchema = new mongoose.Schema({
    form_id : ObjectId,
    name : String,
    responses : [String]

  })

const Form = mongoose.model('Form', formSchema);

const User = mongoose.model('User', userSchema);

const Admin = mongoose.model('Admin', adminSchema);

const Response = mongoose.model('Response',responseSchema);

app.post('/createform', (req, res) => {
    const { name, questions } = req.body.form;
    const questionSet = questions.map((question)=>{
    const { question: questionText, options } = question;
    return { question: questionText, options };
    })
    const obj ={
        name : name,
        questions : questions
    }
    Form.findOne({ name }, (err, form) => {
            if (form) {
                res.status(400).json('Form name already in use');
            } else {
                const newForm = new Form({
                    name,
                    questions: questionSet
                });
                newForm.save((err, user) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json('Success');
                    }
                });
                    }
            });
    });

app.get('/getformnames', (req, res) => {
    Form.find({},(err,forms)=>{
        const names= forms.map((form)=>{
        const {name, _id} = form
        return {name,_id}})
        res.json(names);
    })
    
    });

app.get('/getform/:_id', (req, res) => {
    const {_id} = req.params;
    Form.findById(_id,(err,form)=>{
        res.json(form);
    })
    });

app.get('/getresponses', (req, res) => {
    console.log("hi",req.query.form_id);
     const form_id = req.query.form_id;
     Response.find({form_id}, (err, response) => {
    if (err) {
    res.status(400).json('User not found');
    } else {
        console.log(response)
        res.json(response);
    }
    });
    });
    
app.post('/saveresponse',(req,res)=>{
    const {form_id, name, responses} = req.body.response;
    console.log(req.body)
    console.log(form_id,name,responses)
    const newResponse = new Response({
        form_id : form_id,
        name : name,
        responses : responses
    })
    newResponse.save((err, response) => {
        if (err) {
            res.send(err);
        } else {
            res.json('Success');
        }
    });
})

app.post('/user/register', (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (user) {
            res.status(400).json('Email already in use');
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    res.send(err);
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password: hash
                    });
                    newUser.save((err, user) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json('Success');
                        }
                    });
                }
            });
        }
    });
});

app.post('/user/signin', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
    if (err) {
    res.status(400).json('User not found' );
    } else if (!user) {
    res.status(400).json('User not found' );
    } else {
    bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
    res.send(err);
    } else if (!result) {
    res.status(400).json('Incorrect password' );
    } else {
    res.json(user);
    }
    });
    }
    });
    });

app.post('/admin/register', (req, res) => {
    const { name, email, password } = req.body;
    Admin.findOne({ email }, (err, user) => {
        if (user) {
            res.status(400).json('Email already in use');
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    res.send(err);
                } else {
                    const newAdmin = new Admin({
                        name,
                        email,
                        password: hash
                    });
                    newAdmin.save((err, user) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json('Success');
                        }
                    });
                }
            });
        }
    });
});

app.post('/admin/signin', (req, res) => {
    const { email, password } = req.body;
    Admin.findOne({ email }, (err, user) => {
    if (err) {
    res.status(400).json('Admin not found' );
    } else if (!user) {
    res.status(400).json('Admin not found' );
    } else {
    bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
    res.send(err);
    } else if (!result) {
    res.status(400).json('Incorrect password' );
    } else {
    res.json(user);
    }
    });
    }
    });
    });
    
app.listen(3000, () => {
    console.log("App running on port 3000")
});