const mongoose=require('mongoose')

require ('dotenv').config()
const url = process.env.MONGODB_URI

mongoose.connect(url)
mongoose.Promise=global.Promise

const Person= mongoose.model('Person',{
  name: String,
  number: String
})




  if(process.argv.length>2){
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
      })

  person
  .save()
  .then(result=>{
      console.log('lisätään '+person.name+', numero '+person.number+' luetteloon')
      mongoose.connection.close()
  })}
    else{
        Person
        .find({})
        .then(result => {
        result.forEach(person => {
            console.log(person.name+" "+person.number+" ,id: "+person.id)
        })
        mongoose.connection.close()
  })
}