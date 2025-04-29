module.exports = {
  siteUrl: 'https://crewsity.com',
  generateRobotsTxt: true,
  outDir: './public',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://crewsity.com/sitemap.xml',
    ],
  },
  exclude: ['/server-sitemap.xml'],
};
