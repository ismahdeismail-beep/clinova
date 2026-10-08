module.exports = {
  ci: {
    uploadArtifacts: true,
    upload: {
      target: 'temporary-public-storage',
    },
  },
  collects: {
    include: -'./lighthouse/**/*.json',
  },
}
