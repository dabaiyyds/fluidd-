import Vue from 'vue'
import { MutationTree } from 'vuex'
import { ChartData, ChartState } from './types'
import { defaultState } from './'

export const mutations: MutationTree<ChartState> = {
  /**
   * Reset state
   */
  setReset (state) {
    Object.assign(state, defaultState())
  },

  /**
   * Init the chart store from db
   */
  setInitCharts (state, payload: ChartState) {
    if (payload) Object.assign(state, payload)
  },

  /**
   * Inits the chart store from moonraker.
   */
  setChartStore (state, payload: ChartData[]) {
    state.chart = payload
    state.ready = true
  },

  /**
   * Adds a single chart entry.
   */
  setChartEntry (state, payload: { type: string; retention: number; data: ChartData }) {
    // Dont keep data older than our set retention
    if (!state[payload.type]) {
      Vue.set(state, payload.type, [])
      // console.log('created new array', payload.type)
    }
    state[payload.type].push(payload.data)
    // console.log('set data', payload.type, payload.data)
    while (state[payload.type].length > payload.retention) {
      state[payload.type].splice(0, 1)
    }
  },

  setSelectedLegends (state, payload) {
    state.selectedLegends = payload
  }
}
