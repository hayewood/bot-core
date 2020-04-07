module.exports = (function(Module) {
    "use strict";



    return class CooldownManager extends Module {
        /**
		 * @inheritDoc
		 * @returns {CooldownManager}
		 */
        static singleton() {
			if (!CooldownManager.module) {
				CooldownManager.module = new CooldownManager();
			}
			return CooldownManager.module;
        }
        
        
		/**
		 * Creates a new Cooldown manager instance.
		 */
		constructor () {
			super();
			this.data = [];
		}


    }
});