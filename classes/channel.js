/* global hb */
module.exports = (function () {
    "use strict";
    const axios = require('axios').default;
    const instance = axios.create({
        baseURL: 'https://hayewood.com/api/v2',
        timeout: 1000,
        headers: {'Authorization': process.env.APIKEY}
      });

    return class Channel {
        constructor(data) {
            this.Name = data.channel_name;

            this.BanphraseUrl = data.banphrase_url;

            this.ID = data.channel_id;
        }
        /** @override */
        static async init () {
            await Channel.loadData();
            return Channel;
        }

        static async loadData () {
            /** @type Channel[] */
            try {
                Channel.data = ((await instance.get('/channels')).data).map(record => new Channel(record));
            }catch(error) {
                console.log(error);
            }
        }

        
        static async reloadData () {
            Channel.data = [];
            await Channel.loadData();
        }

    }
})();
