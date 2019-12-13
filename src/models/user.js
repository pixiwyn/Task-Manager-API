const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid!');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number!');
      }
    }
  },
  password: {
    type: String,
    minlength: 7,
    required: true,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain password!');
      }
    }
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true
});

//virtual property aka relationship between entities
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id', // User
  foreignField: 'owner' // Tasks
});

userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '7 days'
  });

  this.tokens = this.tokens.concat({ token });

  await this.save();

  return token;
};

userSchema.methods.toJSON = function() {
  const userObj = this.toObject();

  delete userObj.tokens;
  delete userObj.password;
  delete userObj.avatar;

  return userObj;
};

userSchema.statics.findByCreds = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login!');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login!');
  }

  return user;
};

// Mongoose Save Middle Ware, Hash Plain Text Password Pre Save.
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

// Mongoose Cascade Delete Tasks Upon Deleting User
userSchema.pre('remove', async function(next){
  await Task.deleteMany({ owner: this._id});
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
