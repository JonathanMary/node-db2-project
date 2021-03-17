const db = require('../../data/db-config')

const getAll = () => {
  return db('cars');
}

const getById = async (id) => {
  const [car] = await db('cars').where('id', id);
  return car;
}

const create = async (body) => {
  const id = await db('cars').insert(body);
  return getById(id);
}

module.exports = {
  getAll,
  getById,
  create,
}