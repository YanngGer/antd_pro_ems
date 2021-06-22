import request from 'umi-request';
export async function getDashboardAnalysisChartData() {
  return request('/api/dashboard/analysis/chart_data');
  // return request('/api/fake_chart_data');
}
