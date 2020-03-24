'use strict';

const db = require('better-sqlite3')('ranvierdb');

/**
 * Data source when you have all entities in a sqlite table
 */
class SqliteDataSource {
  constructor() {
  }

  hasData(config = {}) {
	if (config.table == undefined) {
      throw new Error(`You must set a config value for table in your ranvier.json file for this data`);
	}
	db.exec('CREATE TABLE IF NOT EXISTS' + config.table + '(name TEXT UNIQUE, data TEXT)');
	const stmt = db.prepare('SELECT name FROM ' + config.table);
	return Promise.resolve(stmt.get());
  }

  fetchAll(config = {}) {

    if (!this.hasData()) {
      throw new Error(config.table + ` table does not exist and cannot create`);
    }

	const stmt = db.prepare('SELECT * FROM ' + config.table);
    return Promise.resolve(stmt.all());
  }

  fetch(config = {}, id) {
	const stmt = db.prepare('SELECT data FROM ' + config.table + ' WHERE name = ?');
	const player = stmt.get(id);

	if (player == undefined) {
		throw new ReferenceError(`Record with id [${id}] not found.`);
	}

    return Promise.resolve(JSON.parse(player.data));
  }

  replace(config = {}, data) {
	const stmt = db.prepare('REPLACE INTO ' + config.table + '(name, data) values (?, ?)');
	return Promise.resolve(stmt.run(data.name, JSON.stringify(data, null, 2)));
  }

  update(config = {}, id, data) {
	const exists = db.prepare('SELECT name from ' + config.table + ' where name = ?').get(id);
	let result;
	if (exists == undefined) {
		result = db.prepare('INSERT INTO ' + config.table + '(data, name) values (?, ?)').run(JSON.stringify(data), id);
	} else {
		result = db.prepare('UPDATE ' + config.table + ' SET data = ? where name = ?').run(JSON.stringify(data), id);
	}
	return Promise.resolve(result);
  }
}

module.exports = SqliteDataSource;
