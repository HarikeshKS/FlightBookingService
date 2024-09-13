const express = require("express");
const { PORT, DB_SYNC } = require("./config/server-config");
const bodyParser = require("body-parser");
const app = express();

const apiRoutes = require("./routes/index");

const db = require("./models/index");

function setupAndStartServer() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api", apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server Started at PORT: ${PORT}`);
        
        // if (DB_SYNC) {
        //     db.sequelize.sync({ alert: true });
        // }
    });
    
}

setupAndStartServer();
