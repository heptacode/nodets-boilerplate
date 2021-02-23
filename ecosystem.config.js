module.exports = {
  apps: [
    {
      name: "nodets-boilerplate",
      script: "dist/app.js",
      autorestart: true,
      max_memory_restart: "2G",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
