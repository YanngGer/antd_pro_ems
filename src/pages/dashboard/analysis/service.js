import request from 'umi-request';
export async function fakeChartData() {
  // return request('/api/dashboard_analysis_chart_data');
  return request('/api/fake_chart_data');
}
