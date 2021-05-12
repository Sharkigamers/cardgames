const passport = require("passport");
const { use } = require("passport");

class LocalUser {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    static formatString(val) {
        return '\'' + val + '\'';
    }

    static findOne(client, username, done) {
        var result = client.query('SELECT * from users WHERE username LIKE \'' + username + "'", function(result) {
            if (result.rows[0] === 'undefined') {
                return done(null, false, { message: 'User not found' });
            } else {
                const password = result.rows[0].password;
                const email = result.rows[0].email;
                var newUser = new LocalUser(username, password, email);
                return done(null, newUser);
            }
        });
        
        return null;
    }

    static saveUser(client, username, password, email, id) {
        var query = 'INSERT INTO users VALUES(' + id + ', ' + this.formatString(username) + ', ' + this.formatString(password)
            + ', 0, ' + this.formatString(email) + ')';
        client.query(query, function(result) {
            console.log('OK');
        });
    }

    static tryFindOne(client, username, id, callback) {
        var result = client.query('SELECT * from users WHERE username LIKE \'' + username + "'", function(result) {
            if (result.rowCount == 0) {
                LocalUser.saveUser(client, username, "lopes", username, result.rowCount + 1);
                var newUser = new LocalUser(username, '', username);
                return callback(null, newUser);
            } else {
                const password = result.rows[0].password;
                const email = result.rows[0].email;
                var newUser = new LocalUser(username, "", email);
                return callback(null, newUser);
            }
        });
        
        return null;
    }

    static getListWidgets(client, clientId, callback) {
        client.getWidgets(clientId, (res) => {
            callback(res);
        });
    }

    static addWidget(client, userId, type, param_1, param_2, param_3, param_4, callback) {
        client.addWidget(userId, type, param_1, param_2, param_3, param_4, (res) => {
            console.log(res);
            callback(res);
        });
    }

    static updateWidget(client, widgetId, userId, type, param_1, param_2, param_3, param_4, callback) {
        client.updateWidget(widgetId, userId, type, param_1, param_2, param_3, param_4, (res) => {
            console.log(res);
            callback(res);
        });
    }

    static removeWidget(client, widgetId, userId, callback) {
        client.removeWidget(widgetId, userId, (res) => {
            console.log(res);
            callback(res);
        });
    }

};

module.exports = LocalUser;