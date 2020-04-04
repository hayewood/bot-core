/* global hb */
module.exports = (function () {
    "use strict";
    const axios = require('axios').default;
    const instance = axios.create({
        baseURL: 'https://hayewood.com/api/v2',
        timeout: 1000,
        headers: {'Authorization': process.env.APIKEY}
      });

    return class User {
        constructor(data) {
            this.Name = data.user_name;

            this.Points = data.points;

            this.ID = data.user_id;
        }
        /** @override */
        static async init () {
            await User.loadData();
            return User;
        }

        static async loadData () {
            /** @type User[] */
            try {
                User.data = ((await instance.get('/users')).data).map(record => new User(record));
            }catch(error) {
                console.log(error);
            }
        }

        
        static async reloadData () {
            User.data = [];
            await User.loadData();
        }

    }
})();
