import * as housesRepository from "../repositories/houses.repository.js";
export async function getAllHouses(req, res) {
  try {
    const allHouses = await housesRepository.getAllHouses();
    res.json(allHouses);
    //res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error", code: error.code });
  }
}
