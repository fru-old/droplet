import path from 'path';
export default (config, env, helpers) => {
  config.resolve.alias['droplet-tree'] = path.resolve(__dirname, '../droplet-tree');
  config.resolve.alias['droplet-core'] = path.resolve(__dirname, '../droplet-core');
  config.resolve.modules = [path.resolve(__dirname, './node_modules')]
};
