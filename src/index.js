import * as d3 from "d3-dispatch";
const DEFAULT_CHART_GROUP = "DEFAULT_CHART_GROUP";

export const dispatch = d3.dispatch

export function create(...subscriptions) {
  subscriptions = subscriptions.length
    ? subscriptions
    : ["renderAll", "filterAll", "redrawAll"];

  const state = { groups: {} }

  function initialize(group) {
    if (!state.groups[group]) {
      state.groups[group] = new Set();
    }
    return state.groups[group];
  }

  return {
    dispatch: d3.dispatch(...subscriptions),
    registry: {
      list(group = DEFAULT_CHART_GROUP) {
        return initialize(group).values();
      },
      register(chart, group = DEFAULT_CHART_GROUP) {
        initialize(group).add(chart);
      },
      deregister(chart, group = DEFAULT_CHART_GROUP) {
        initialize(group).remove(chart);
      },
      clear(group = DEFAULT_CHART_GROUP) {
        initialize(group).clear();
      }
    }
  };
}
