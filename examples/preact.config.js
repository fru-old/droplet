import path from 'path';
export default (config, env, helpers) => {
  config.resolve.alias['droplet-tree'] = path.resolve(__dirname, '../droplet-tree/react/index.js');
  config.resolve.alias['droplet-core'] = path.resolve(__dirname, '../droplet-core/index.js');
};
