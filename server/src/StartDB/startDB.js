 const { Country } = require("../db");
const { countries } = require("../../api/db.json");
module.exports = async () => {
  countries.forEach(async (country) => {
    const id = country.cioc ? country.cioc : country.cca3;
    const name = country.name.common || country.name.official;
    const image = country.flags.png;
    const region = country.continents[0];
    const subregion = country.subregion;
    const capitalCity = country.capital?.length ? country.capital[0] : "none";
    const area = country.area;
    const population = country.population;

    await Country.findOrCreate({
      where: {
        id,
      },
      defaults: {
        name,
        image,
        region,
        subregion,
        capitalCity,
        area,
        population,
      },
    });
  });
};
 


/**
 * Opcion 2 
 * 
 * 
 * 
 * const axios = require ('axios');
const { Country, } = require ('../db')
const { API_ALL } = process.env;

async function LoadDb(req, res) {
  try {
    {
      const AllCountApi = await axios.get(API_ALL);
      const ModelCountries = AllCountApi.data.map((e) => {
        return {
          name: e.name,
          id: e.alpha3Code,
          flagimg: e.flag,
          region: e.region,
          capital: e.capital,
          subregion: e.subregion,
          area: e.area,
          population: e.population,
        };
      });
      ModelCountries.forEach(async (e) => {
        await Country.findOrCreate({
          where: {
            name: e.name,
            id: e.id,
            flagimg: e.flagimg,
            region: e.region,
            capital: e.capital,
            subregion: e.subregion,
            area: e.area,
            population: e.population,
          },
        });
      });
    }
    console.log('DB success')
  } catch (error) {
    res.send(error);
  }
}
module.exports= {LoadDb}
 */