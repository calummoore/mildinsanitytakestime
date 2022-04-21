module.exports = {
  siteUrl: 'https://mildinsanitytakestime.com',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  // Default transformation function
  transform: async (config, path) => {
    if (path === '/') return transformConfig(config, path, { priority: 1 })
    if (path === '/pricing') return transformConfig(config, path, { priority: 0.8 })
    return transformConfig(config, path)
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}

function transformConfig (config, path, overrites) {
  const { priority, changefreq, alternateRefs } = overrites ?? {}
  return {
    loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
    changefreq: changefreq ?? config.changefreq,
    priority: priority ?? config.priority,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    alternateRefs: alternateRefs ?? config.alternateRefs ?? [],
  }
}