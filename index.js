module.exports = (async function (namespace = "hb", options = {}) {
    global[namespace] = {};

    const SingletonTemplate = require("./singleton-template");
    const files = [
        "classes/channel",
        "classes/user"
    ]

    for (const file of files) {

		const start = process.hrtime.bigint();
		const [type] = file.split("/");
        let component = require("./" + file);

		if (type === "objects") {
			global[namespace][component.name] = component;
		}
		else if (type === "singletons") {
			component = component(SingletonTemplate);
			global[namespace][component.name] = await component.singleton();
		}
		else if (type === "classes") {
			global[namespace][component.name] = await component.init();
		}
        
		const end = process.hrtime.bigint();
		console.log(component.name + " loaded in " + Number(end - start) / 1.0e6 + " ms");

    }




});
