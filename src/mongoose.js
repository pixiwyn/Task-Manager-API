const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  ssl: true,
  sslValidate: false,
  sslCA: Buffer.from(process.env.SSL_CA, "base64").toString("ascii")
});
