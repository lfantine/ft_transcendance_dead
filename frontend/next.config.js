/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
	webpackDevMiddleware: (config) => {
	  config.watchOptions = {
		poll: 1000, // Vérifie les modifications toutes les secondes
		aggregateTimeout: 300, // Délai de 300 ms avant d'appliquer les modifications
	  };
	  return config;
	},
  };
