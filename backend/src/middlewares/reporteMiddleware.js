const reporteMiddleware = async (req, res, next) => {
  console.log('La ruta consultada fue:');
  console.log(req.url);
  console.log('El método:');
  console.log(req.method);
  console.log('Con los query:');
  console.table(req.query);

  next(); // Pasa al siguiente middleware o ruta
};

module.exports = 
  reporteMiddleware
;
