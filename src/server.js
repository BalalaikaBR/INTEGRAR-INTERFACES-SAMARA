const application = require('./app/app'); 
application.listen(PORT, () => {
  console.log(`Servidor rodand ${PORT} `);
});