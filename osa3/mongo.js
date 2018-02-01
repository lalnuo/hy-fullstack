const mongoose = require("mongoose");

const url = "mongodb://mongo:mongo@ds121118.mlab.com:21118/fshy";

mongoose.connect(url);
mongoose.Promise = global.Promise;

const Contact = mongoose.model("Person", {
  name: String,
  number: String
});

const name = process.argv[2];
const number = process.argv[3];

if (!name || !number) {
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact.name, contact.number);
    });
    mongoose.connection.close();
  });
} else {
  new Contact({ name, number }).save().then(() => {
    console.log("Contact saved!");
    mongoose.connection.close();
  });
}
