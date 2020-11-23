const user_data = require('data-store')({ path: process.cwd() + '/data/users.json' });

class User {
    constructor(first_name, last_name, email, username, password) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    update(user) {
        this.user = user;
        user_data.set(this.username.toString(), this);
    }

    delete() {
        user_data.del(this.username.toString());
    }
}

User.getAllIDs = () => {
    return Object.keys(user_data.data).map(id => parseInt(id));
};

User.getAllIDsForOwner = (owner) => {
    return Object.keys(user_data.data).filter(id => user_data.get(id).owner == owner.map(parseInt(id)));
}

User.findByName = (username) => {
    let udata = user_data.get(username);
    if (udata != null) {
        return new User(udata.username, udata.password);
    }
    return null;
};

// User.next_id = Secret.getAllIDs().reduce((max, next_id) => {
//     if (max < next_id) {
//         return next_id;
//     }
//     return max;
// }, -1) + 1;

User.create = (first_name, last_name, email, username, password) => {
    // let id = Secret.next_id;
    // Secret.next_id += 1;
    let s = new User(first_name, last_name, email, username, password);
    user_data.set(s.username.toString(), s);
    console.log("creation of new user");
    return s;
}

module.exports = User;