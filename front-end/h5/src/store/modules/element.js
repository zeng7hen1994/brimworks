// initial state
import Element from '../../components/core/models/element'

const state = {
  editingElement: null,
  elementsOfCurrentPage: []
}

// getters
const getters = {

}

// actions
const actions = {
  setEditingElement ({ commit }, payload) {
    commit('setEditingElement', payload)
  },
  setElementPosition ({ commit }, payload) {
    commit('setElementCommonStyle', payload)
  },
  setElementShape ({ commit }, payload) {
    commit('setElementCommonStyle', payload)
  },
  recordElementRect ({ commit }, payload = {}) {
    commit('recordRect', payload)
  },
  elementManager ({ commit }, payload) {
    commit('elementManager', payload)
  }
}

// mutations
const mutations = {
  setEditingElement (state, payload) {
    state.editingElement = payload
  },
  setElementCommonStyle (state, payload) {
    state.editingElement.commonStyle = {
      ...state.editingElement.commonStyle,
      ...payload
    }
  },
  elementManager (state, { type, value }) {
    switch (type) {
      case 'add':
        const element = new Element(value)
        state.elementsOfCurrentPage.push(element)
        break
      case 'copy':
        state.elementsOfCurrentPage.push(state.editingElement.clone())
        break
      case 'delete':
        const { elementsOfCurrentPage, editingElement } = state
        let index = elementsOfCurrentPage.findIndex(e => e.uuid === editingElement.uuid)
        if (index !== -1) {
          let newElements = elementsOfCurrentPage.slice()
          newElements.splice(index, 1)
          state.elementsOfCurrentPage = newElements
        }
        break
      default:
    }
  },
  recordRect (state, { type, value }) {

  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
