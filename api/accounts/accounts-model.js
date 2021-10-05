const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  //SELECT * FROM Accounts
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  //SELECT * FROM Accounts WHERE id = X
  return db('accounts')
    .where('id', id)
    .first()
}

const create = async account => {
  // DO YOUR MAGIC
  // INSERT INTO Accounts ('name', 'budget') VALUES ('newname', 'newbudget')
  const [id] = await db('accounts')
    .insert(account)
  return getById(id)
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  // UPDATE Accounts SET name = 'foo', account = 'bar' WHERE id = X
  await db('accounts')
    .update(account)
    .where('id', id)
  return getById(id)
}

const deleteById = async id => {
  // DO YOUR MAGIC
  // DELETE FROM Accounts WHERE id = X
  const removed = await getById(id)
  await db('accounts')
    .where('id', id)
    .delete()
  return removed
}

const findByName = async name => {
  return db('accounts')
    .where('name', name)
    .first()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  findByName,
}
