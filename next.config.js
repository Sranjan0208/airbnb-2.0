const webpack = require("webpack");

const { parsed: myEnv } = require("dotenv").config({
  path: "/home/sujal/Documents/airbnb-2.0/.env",
});

module.exports = {
  images: {
    domains: ["links.papareact.com"],
  },

  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
  // Only add public key to next.config.js, Not the private key
  // env: {
  //   mapbox_key:
  //     "pk.eyJ1Ijoic3JhbmphbjAyMDgiLCJhIjoiY2xkbHhyOXFoMDQwaTNubXgwOTQyeW42ayJ9.t0Jr84A6n0dS2DFRvFDHKQ",
  // },
};
