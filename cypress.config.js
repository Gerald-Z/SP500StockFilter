const { defineConfig } = require("cypress");

require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.GOOGLE_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
