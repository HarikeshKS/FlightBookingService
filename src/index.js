const express = require("express");
const { PORT } = require("./config/server-config");
function startAndSetup() {
    const app = express();

    app.listen(PORT, () => {
        console.log(`Server Started at PORT: ${PORT}`);
    });
}

startAndSetup();
