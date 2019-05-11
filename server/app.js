import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
app.use('/', (request, response) => response.json({
  message: 'Its Listening on port 30000',
}));
app.listen(port, () => console.log(`Should Be Listening On Port ${port}...`));
