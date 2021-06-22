import { getDashboardAnalysisChartData } from './service';

const initState = [];
const Model = {
  namespace: 'dashboardAndanalysis',
  state: initState,
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getDashboardAnalysisChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

    clear() {
      return initState;
    },
  },
};
export default Model;
