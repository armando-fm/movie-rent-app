import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: 'Ant Design Pro',
    // copy from pro site
    navTheme: 'dark',
    primaryColor: '#1890ff',
    layout: 'sidemenu',
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: false,
    title: 'Ant Design Pro',
    pwa: false,
    iconfontUrl: '',
  },
  routes: [
    { path: '/', component: '@/pages/index', name: 'Inicio' },
    { path: '/customers', component: '@/pages/customers', name: 'Clientes' },
    { path: '/movies', component: '@/pages/movies', name: 'Filmes' },
    { path: '/rents', component: '@/pages/rents', name: 'Locações' },
  ],
  fastRefresh: {},
});
