const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  eslint: {
    dirs: ['components', 'constant', 'layouts', 'libs', 'pages', 'scripts', 'utils'],
  },
  images: {
    remotePatterns: [
      {
        hostname: '**/i.scdn.co/**',
      },
    ],
  },
  typescript: { tsconfigPath: './tsconfig.json' },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },

  // old redirect from kaveh.page
  async redirects() {
    return [
      {
        source: '/digital_nomad',
        destination: '/blog/digital-nomadness',
        permanent: true,
      },
      {
        source: '/lessons_solo_traveling',
        destination: '/blog/18-lessons-learned-solo-travelling',
        permanent: true,
      },
      {
        source: '/life_is_short',
        destination: '/blog/life-is-short',
        permanent: true,
      },
      {
        source: '/medellin',
        destination: '/blog/medellin',
        permanent: true,
      },
    ]
  },
})
