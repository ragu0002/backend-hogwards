import * as housesRepository from "../repositories/houses.repository.js";
export async function getAllHouses(req, res) {
  try {
    const allHouses = await housesRepository.getAllHouses();
    res.json(allHouses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

export async function getHousesById(req, res) {
  try {
    const id = req.params.id;
    const house = await housesRepository.getHousesById(id);

    if (house) {
      res.status(200).json(house);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
