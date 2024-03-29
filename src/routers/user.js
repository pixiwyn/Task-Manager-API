const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const User = require('../models/user');
const auth = require('../middleware/auth');
const { sendEmail } = require('../emails/emailService');
const { welcomeEmail } = require('../emails/templates/welcomeEmail');
const { cancelEmail } =  require('../emails/templates/cancelEmail');

const router = new express.Router();

const avatar = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if(file.originalname.match(/\.(jpg|jpeg|png)$/)){
      cb(undefined, true);
    } else {
      cb(new Error('File must be an image'));
    }
  }
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

   sendEmail(user.email, 'Welcome to Task Manager', welcomeEmail(user.name));

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();

    sendEmail(req.user.email, 'Account for Task Manager has been Canceled', cancelEmail(req.user.name));

    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/users/me/avatar', auth, avatar.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();
  req.user.avatar = buffer;
  await req.user.save();
  res.send();
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);

  }catch (e) {
    res.status(404).send();
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach(update => {
      req.user[update] = req.body[update];
    });

    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send({ error: 'problem logging out' });
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCreds(req.body.email, req.body.password);
    const token = await user.generateAuthToken();

    res.send({ user: user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
