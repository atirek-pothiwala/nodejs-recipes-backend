const app = require("./src/app");

const PORT = 3000;
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
