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
      const question = require('./question');

    return class Command {
        constructor(data) {
            this.Name = data.command_name;

            this.ID = data.command_id;

            this.PingUser = data.ping_user;

            this.Description = data.command_desc;

            this.Code = data.code;

            this.Cooldown = data.cooldown_ms;

        }
        /** @override */
        static async init () {
            await Command.loadData();
            return Command;
        }

        static async loadData () {
            /** @type Channel[] */
            try {
                Command.data = ((await (instance.get('/commands'))).data).map(record => new Command(record));       
            }catch(error) {
                console.log(error);
            }
        }
        
        static async execute (code) {
            try {
                return await eval(code);

            }catch(error) {
                console.debug(error);
            }
        }

        static get (identifier) {
			if (identifier instanceof Command) {
				return identifier;
			}
			else if (typeof identifier === "number") {
				return Command.data.find(command => command.ID === identifier);
			}
			else if (typeof identifier === "string") {
				return Command.data.find(command =>
					command.Name === identifier
				);
			}
			else {
				throw new Error({
					message: "Invalid command identifier type",
					args: { id: identifier, type: typeof identifier }
				});
			}
		}

        
        static async reloadData () {
            Command.data = [];
            await Command.loadData();
        }

        static async checkExec(command, args, userName, channelName, privMessageData) {
            var commandName = command.substr(1);

            if (!Array.isArray(args)) {
				throw new Error({
					message: "Command arguments must be provided as an array"
				});
            }
            
            const resCommand = Command.get(commandName);
            if(resCommand && resCommand.Code)
                return await Command.execute(resCommand.Code);

        }

    }
})();
