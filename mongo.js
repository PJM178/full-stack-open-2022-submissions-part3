const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://petrim:${password}@cluster0.apptmol.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', phonebookSchema)

mongoose
  .connect(url)
  .then((result) => {
    if (process.argv.length === 3) {
      Person.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(person => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
      })
    }

    else if (process.argv.length > 3) {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })

      return person.save().then((result) => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
      })
    }

  })
  .catch((err) => {
    console.log(err)
    return mongoose.connection.close()
  })