import moment from 'moment';
import { defineConfig } from 'umi';
import ptBR from 'antd/lib/locale/pt_BR';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: 'Gestão de Locação',
    // copy from pro site
    navTheme: 'dark',
    primaryColor: '#1890ff',
    layout: 'sidemenu',
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: false,
    title: 'Gestão de Locação',
    pwa: false,
    iconfontUrl: '',
  },
  locale: {
    default: ptBR.locale,
  },
  routes: [
    { path: '/', component: '@/pages/index', name: 'Inicio' },
    { path: '/customers', component: '@/pages/customers', name: 'Clientes' },
    { path: '/movies', component: '@/pages/movies', name: 'Filmes' },
    { path: '/rents', component: '@/pages/rents', name: 'Locações' },
  ],
  fastRefresh: {},
});
