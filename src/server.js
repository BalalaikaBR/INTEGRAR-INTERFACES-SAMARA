const application = require('./app/app'); 
require('dotenv').config();

const PORT = process.env.PORT || 3000; //ta bugadão coloquei pra ir direto :)

application.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} `);
});