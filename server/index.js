const express = require('express');
const app = express();
const port = 3001;


// adding logger to check incoming requests 
const logger = (req,res,next) => {
  console.log(req);
  next();
}

app.use(logger);

app.use(express.json());

const TEST_USER = {
  username: 'testuser',
  password: 'password',
};

function login(postParams) {
  if (
    postParams &&
    postParams.username === TEST_USER.username &&
    postParams.password === TEST_USER.password
  ) {
    return {
      username: 'testuser',
      fullname: 'Test User',
    };
  }
  return null
}

app.get('/', (req, res) => {
  res
    .status(200)
    .type('application/json')
    .send({success:true});
})

app.get('/api/login', (req, res) => {
    res
      .status(200)
      .type('application/json')
      .send({success:true});
})

app.post('/api/login', (req, res) => {
  const userDetails = login(req.body);
  if (userDetails) {
    res
      .status(200)
      .type('application/json')
      .send(userDetails);
  } else {
    res
      .status(401)
      .type('application/json')
      .send({
        status: 'error',
        message: 'incorrect username or password.'
      });
  }
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});
