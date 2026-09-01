const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);


require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');

const PORT = Number(process.env.PORT) || 5000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Travello API running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
})();
