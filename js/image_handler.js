import { api } from "../../scripts/api.js";
import { app } from "../../scripts/app.js";

// Registrer utvidelsen
app.registerExtension({
    name: "my.custom.node_extension",

    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        //console.log(nodeData);
        // Sjekk om noden er i ønsket kategori
        if (!nodeData?.category?.startsWith("examples")) {
            return;
        }

        if (nodeData.name === "Example Node") {
            const onCreated = nodeType.prototype.onNodeCreated;
		    const onConnectionsChange = nodeType.prototype.onConnectionsChange;

            // nodeType.prototype.onConnectionsChange = function () {
            //     console.log('changed connection')
            // };

            nodeType.prototype.onConnectionsChange = function (side,slot,connect,link_info,output) {     
                const r = onConnectionsChange?.apply(this, arguments);   
                console.log("Someone changed my connection!");
                return r;
            }


            nodeType.prototype.onNodeCreated = function () {
                console.log("Node created:", this.title);

                // Legg til en knapp som resetter sliders til 1.0
                this.addWidget("button", "RESET ALL", null, () => {
                    this.widgets.forEach(w => {
                        if (w.type === "slider") {
                            w.value = 1.0;
                        }
                    });
                });

                // Legg til en knapp som setter alle sliders til 0.0
                this.addWidget("button", "ZERO ALL", null, () => {
                    this.widgets.forEach(w => {
                        if (w.type === "slider") {
                            w.value = 0.0;
                        }
                    });
                });
            };
        }
    }
});



