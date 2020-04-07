/* global hb */
module.exports = (function () {
    "use strict";
    const axios = require('axios').default;
    const instance = axios.create({
        baseURL: 'https://hayewood.com/api/v2',
        timeout: 1000,
        headers: {'Authorization': process.env.APIKEY}
      });

    const User = class User {
        constructor(data) {
            this.Name = data.user_name;

            this.Points = data.points;

            this.ID = data.user_id;
        }
        /** @override */
        static async init () {
            User.data = new Map();
            await User.loadData();
            return User;
        }

        static async loadData () {
            /** @type {Map<string, User>} */
            User.data = User.data || new Map();
            /** @type User[] */
            try {
                var users = (await (instance.get('/users'))).data;
                //User.data = users.map(record => new User(record));
                for (const user of users) {
                    User.data.set(user.user_name, user);
                }
            }catch(error) {
                console.log(error);
            }
        }

        
        static async reloadData () {
            User.data.clear();
            await User.loadData();
        }

        static async get (identifier, strict = true) {
            if (identifier instanceof User) {
                return identifier;
            }

            if(typeof identifier === "number") {
                
            }
            else if (typeof identifier === "string") {
                identifier = identifier.replace(/^@/, "").toLowerCase();
                let user = User.data.get(identifier);

                if (!user) {
                    try {
                        var data = (await (instance.post("/users", {
                                user_name: identifier,
                                points: 0
                                }))).data;
                        if(data.error) {
                            console.debug(user.error.message);
                        }
                        else {
                            User.data.set(identifier, data.user_added);
                            user = User.data.get(identifier);
                        }
                    }catch(error) {
                        console.debug(error);
                    }
                            
                }

                return user;
            }
        }
    }
    return User;
})();
