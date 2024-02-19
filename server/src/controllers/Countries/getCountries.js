const getCountriesHandlers = require('../../Handlers/Countries/getCountries');

async function getCountries(req, res) {
  const { name } = req.query;

  try {
    const countries = await getCountriesHandlers(name);
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'No existen paises con ese Nombre.' });
  }
}

module.exports = getCountries;
