export const assets = [
  {
    path: '/examples/101',
    label: '101',
    src: 'documentation/examples/101.jsx',
  },
  {
    path: '/examples/basic',
    label: 'Basic',
    src: 'documentation/examples/Basic.jsx',
  },
  {
    path: '/examples/material-tabs',
    label: 'Material Tabs',
    src: 'documentation/examples/MaterialTabs.jsx',
    dependencies: {
      "@material-ui/core" : "^4.6.1"
    }
  },
  {
    path: '/examples/not-found-page',
    label: 'Not Found Page',
    src: 'documentation/examples/DefaultRoute.jsx',
  },
  {
    path: '/examples/display',
    label: 'Display',
    src: 'documentation/examples/Display.jsx',
  },
];

export const examplesPaths = assets.map(d => d.path.slice(10))
