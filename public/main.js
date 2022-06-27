app.use(express.static('public'))
app.use(bodyParser.json())

const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vadar',
            quote: 'I find your lack of faith disturbing.'
        })
    })
})

app.put('/quotes', (req, res) => {
    quotesCollection.findOneAndUpdate(/* ... */)
    .then(result => {
      console.log(result)
     })
    .catch(error => console.error(error))
}

quotesCollection.findOneAndUpdate(
    { name: 'Yoda' },
  {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  },
  {
    upsert: true
  }
)
  .then(result => {/* ... */})
  .catch(error => console.error(error))