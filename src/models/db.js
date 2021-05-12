const db = require('pg');
const async = require('async');

var currentClient;

async.retry(
    {times: 1000, interval: 1000},
    function(callback) {
      db.connect('postgres://postgres:password@db/postgres', function(err, client, done) {
          if (err) {
              console.error("Waiting for db");
          }
          callback(err, client);
      });
    },
    function(err, client) {
      if (err) {
        return console.error("Giving up");
      }
      console.log("Connected to db");
      currentClient = client;
    }
  );



exports.client = currentClient;
exports.db = db;

exports.getWidgets = function(userId, callback) {
  const query = "SELECT * FROM widgets WHERE idUser = '" + userId + "';";
  db.connect('postgres://postgres:password@db/postgres', function(err, client, done) {
      client.query(query, [], function(err, result) {
          callback(result);
      });
  });
}

exports.addWidget = function(userId, type, param_1, param_2, param_3, param_4, callback) {
  const query = "INSERT INTO widgets values((SELECT COUNT(*) FROM widgets), '" + userId + "', '" + type + "', '" + param_1 + "', '" + param_2 + "', '" + param_3 + "', '" + param_4 + "')";
  db.connect('postgres://postgres:password@db/postgres', function(err, client, done) {
      client.query(query, [], function(err, result) {
        const newQuery = "SELECT * FROM widgets ORDER BY id DESC LIMIT 1;";

        client.query(newQuery, [], function(err, data) {
          callback(data);
        })
      });
  });
}

exports.updateWidget = function(widgetId, userId, type, param_1, param_2, param_3, param_4, callback) {
  const query = "UPDATE widgets SET idUser='" + userId + "', param_1='" + param_1 + "', param_2='" + param_2 + "', param_3='" + param_3 + "', param_4='" + param_4 + "' WHERE id=" + widgetId;
  db.connect('postgres://postgres:password@db/postgres', function(err, client, done) {
      client.query(query, [], function(err, result) {
        callback(result);
      });
  });
}

exports.removeWidget = function(widgetId, userId, callback) {
  const query = "DELETE FROM widgets WHERE id=" + widgetId;
  db.connect('postgres://postgres:password@db/postgres', function(err, client, done) {
      client.query(query, [], function(err, result) {
        callback(result);
      });
  });
}

exports.query = function(query, callback)
    {
        db.connect('postgres://postgres:password@db/postgres', function(err, client, done) {
            client.query(query, [], function(err, result) {
                callback(result);
            });
        });
    };