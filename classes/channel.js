/* global hb */
module.exports = (function () {
    "use strict";
    const axios = require('axios').default;
    const instance = axios.create({
        baseURL: 'https://hayewood.com/api/v2',
        timeout: 1000,
        headers: {'Authorization': process.env.APIKEY}
      });

      var _eval = require('eval')

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
                //Command.data = ((await instance.get('/commands')).data).map(record => new Command(record));
                Channel.data = ((await (instance.get('/channels'))).data).map(record => new Channel(record));
                //User.data = users.map(record => new User(record));
                // for (const channel of Channel.data) {
                //     Channel.data.set(channel.channel_name, channel);
                // }
            }catch(error) {
                console.log(error);
            }
        }

        
        static async reloadData () {
            Channel.data = [];
            await Channel.loadData();
        }

        
        static async get (identifier, strict = true) {
            if (identifier instanceof Channel) {
                return identifier;
            }

            if(typeof identifier === "number") {
                
            }
            else if (typeof identifier === "string") {
                identifier = identifier.replace(/^@/, "").toLowerCase();
                let result = Channel.data.filter(i => i.Name === identifier);
                if(result && result.length == 1)
                    return result[0];
            }
        }

    }
})();
