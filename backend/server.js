const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

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
    entries: {type: Number, default: 0},
    joined: {type: Date, default: Date.now()}
});


// const autoIncrement = require('mongoose-auto-increment');

// const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/form_app');
// autoIncrement.initialize(connection);

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

// formSchema.plugin(autoIncrement.plugin, { model: 'Form', field: 'id', startAt: 1 });

const Form = mongoose.model('Form', formSchema);

const User = mongoose.model('User', userSchema);

const Admin = mongoose.model('Admin', adminSchema);

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

app.get('/getforms', (req, res) => {
    Form.find({},(err,forms)=>{
        res.json(forms);
        console.log(forms);
    })
    });

app.get('/user/profile/:id', (req, res) => {
const { id } = req.params;
User.findById(id, (err, user) => {
if (err) {
res.status(400).json('User not found');
} else {
res.json(user);
}
});
});


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


app.get('/admin/profile/:id', (req, res) => {
    const { id } = req.params;
    Admin.findById(id, (err, user) => {
    if (err) {
    res.status(400).json('Admin not found');
    } else {
    res.json(user);
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