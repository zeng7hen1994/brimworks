// import Work from '../../components/core/models/work'
import Element from '../../components/core/models/element'
import strapi from '../../utils/strapi'

export const actions = {
  previewWork ({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  deployWork ({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  createWork ({ commit }, payload) {
    strapi.createEntry('works').then(entry => {
      window.location = `${window.location.origin}/#/?workId=${entry.id}`
    })
    // commit('createWork')
    // commit('pageManager', { type: 'add' })
    // commit('setEditingPage')
  },
  saveWork ({ commit, state }, payload = {}) {
    // update work with strapi
    strapi.updateEntry('works', state.work.id, state.work)
  },
  fetchWork ({ commit, state }, workId) {
    strapi.getEntry('works', workId).then(entry => {
      commit('setWork', entry)
      commit('setEditingPage')
    })
  }
}

// mutations
export const mutations = {
  setWork (state, work) {
    work.pages.forEach(page => {
      page.elements = page.elements.map(element => new Element(element))
    })
    state.work = work
  },
  // createWork (state) {
  //   state.work = new Work()
  // },
  previewWork (state, { type, value }) {},
  deployWork (state, { type, value }) {}
}
