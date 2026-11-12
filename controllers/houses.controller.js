import * as housesRepository from "../repositories/houses.repository.js";
export async function getAllHouses(req, res) {
  const allHouses = await housesRepository.getAllHouses();
  res.json(allHouses);
}

export async function getHousesById(req, res) {
  const id = req.params.id;
  const house = await housesRepository.getHousesById(id);
  if (!house) throw new HTTPError(404, "This house does not exist");
  res.status(200).json(house);
}
