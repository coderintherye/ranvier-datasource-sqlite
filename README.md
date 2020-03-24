# ranvier-datasource-sqlite
A Sqlite data store for Ranvier MUD as an alternative to flat file storage

To install and use, on the command line in your ranvier folder first do the following:

1) Install sqlite, e.g. on Ubuntu: sudo apt-get install sqlite3
2) In your ranvier folder, install the better-sqlite3 node module: npm install better-sqlite3
3) Install this node module: npm install ranvier-datasource-sqlite
4) Update your ranvier.json to specify the file as a requirement like so:
At the end of JsonDirectory require block add a comma after the }, and add these lines:
"Sqlite": {
	"require": "ranvier-datasource-sqlite.SqliteDataSource"
}

5) Update your ranvier.json file with the needed config for table name,
e.g. for using sqlite as your data store for players, it should look like this:

"players": {
  "source": "Sqlite",
  "config": {
    "database": "ranvierdb",
    "table": "players"
  }
},

6) Start ranvier and it should be working!
