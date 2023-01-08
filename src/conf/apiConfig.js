const github = 'https://api.github.com/users/'
// const kitsu = 'https://kitsu.io/api/edge'


module.exports = {
  getGithubUrl: name => github + name,
  getAnime: department => process.env.VUE_APP_SENTRY_ENV + department,
}
