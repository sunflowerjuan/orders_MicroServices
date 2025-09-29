const app = require("./src/app");
const { registerWithEureka } = require("./src/config/eureka");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Login service corriendo en puerto ${PORT}`);
  registerWithEureka(PORT);
});
