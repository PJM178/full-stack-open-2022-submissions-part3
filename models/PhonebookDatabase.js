const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
    // validate: {
    //   validator: (v) => {
    //     return new Promise( (resolve, reject) => {

    //     })
    //   }
    // }
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 50,
    validate: {
      validator: (v) => {
        return /^(\d{3}|\d{2})-\d+$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number - start with "###-"`
    }
  }
})

const Person = mongoose.model('Person', phonebookSchema)

console.log('connecting to', url)

mongoose.connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
    if (process.argv.length === 2) {
        Person.find({}).then(result => {
          console.log('Phonebook:')
          result.forEach(person => {
            console.log(person.name, person.number)
          })
        })
      }
  })
  .catch((err) => {
    console.log('error connecting to MongoDB:', err.message)
    return mongoose.connection.close()
  })



phonebookSchema.set('toJSON', {
    transform: (document, returnObject) => {
      returnObject.id = returnObject._id.toString()
      delete returnObject._id
      delete returnObject.__v
    }
})


module.exports = Person
  