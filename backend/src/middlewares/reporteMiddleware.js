const reporteMiddleware = (req, res, next) => {
    // ruta solicitada y fecha/hora 
    const route = req.path;
    const timestamp = new Date().toISOString();
  
    // Registrar información en consola
    console.log(`Ruta accedida: ${route} - ${timestamp}`);
  
    next();
  };
  
  module.exports = reporteMiddleware;
  