/* src/config/eureka.js
Esta clase configura el registro del servicio en Eureka.
*/

const { Eureka } = require("eureka-js-client");

function registerWithEureka(port) {
  const client = new Eureka({
    instance: {
      app: "login-service",
      hostName: "login-service",
      ipAddr: "127.0.0.1",
      port: {
        $: port,
        "@enabled": "true",
      },
      vipAddress: "login-service",
      dataCenterInfo: {
        "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
        name: "MyOwn",
      },
    },
    eureka: {
      host: process.env.EUREKA_HOST || "host.docker.internal",
      port: 8761,
      servicePath: "/eureka/apps/",
    },
  });

  client.start((error) => {
    console.log(error || "Login service registrado en Eureka");
  });
}

module.exports = { registerWithEureka };
