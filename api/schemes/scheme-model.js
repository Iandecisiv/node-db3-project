const db = require('../../data/db-config.js');

function find() {
  return db('schemes')
    .select();
}

function findById(id) {
  return db('schemes')
        .where({ id })
        .first();
}

function findSteps(id) {
  return db('steps as s')
        .join('schemes as sc', 'scheme_id', 'sc.id')
        .select('scheme_name', 'step_number', 'instructions')
        .where( "scheme_id", id )
        .orderBy('step_number');
}

function add(scheme) {
  return db('schemes')
    .insert(scheme)
    .then(ids => ({ id: ids[0] }));
}

function addStep(scheme_id, step) {
  
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
