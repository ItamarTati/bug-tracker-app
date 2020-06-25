const express = require('express');
const app = express()

app.use(express.static('public'))
app.listen(process.env.PORT || 4000, () => console.log('All is running'))