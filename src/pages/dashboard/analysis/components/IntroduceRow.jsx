import { Col, Row, Tooltip } from 'antd';
import { FormattedMessage } from 'umi';
import React, {useEffect, useState} from 'react';
import numeral from 'numeral';
import { ChartCard, MiniArea, MiniBar, Field } from './Charts';
import { getDashboardAnalysisChartData } from '../service';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};

const IntroduceRow = ({ loading, visitData }) => {

  const [data,setData] = useState([])
  useEffect(async ()=>{
    const res = await getDashboardAnalysisChartData()
    setData(res)
  },[])

  return (
    <React.Fragment>
      {data.length !=0 &&
      data.map((item)=>{
          const {
            device_type_name,unit_name,today_usage,today_usage_char,
            yesterday_usage,week_usage,week_usage_char,last_week_usage,month_usage,month_usage_char,
            last_month_usage,year_usage,year_usage_char,last_year_usage
          } = item
          return (
            <Row gutter={24}>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  unit={unit_name}
                  bordered={false}
                  title={
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.today-usage"
                      defaultMessage="今日用量"
                    />
                  }
                  action={<Tooltip title={device_type_name}>{device_type_name}</Tooltip>}
                  loading={loading}
                  total={numeral(today_usage).format('0,0')}
                  footer={
                    <Field
                      label={
                        <FormattedMessage
                          id="dashboardandanalysis.analysis.yesterday-usage"
                          defaultMessage="昨日用量"
                        />
                      }
                      value={numeral(yesterday_usage).format('0,0')}
                    />
                  }
                  contentHeight={46}
                >
                  <MiniArea color="#975FE4" data={today_usage_char} />
                </ChartCard>
              </Col>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  unit={unit_name}
                  bordered={false}
                  title={
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.week-usage"
                      defaultMessage="本周用量"
                    />
                  }
                  action={<Tooltip title={device_type_name}>{device_type_name}</Tooltip>}
                  loading={loading}
                  total={numeral(week_usage).format('0,0')}
                  footer={
                    <Field
                      label={
                        <FormattedMessage
                          id="dashboardandanalysis.analysis.last-week-usage"
                          defaultMessage="上周用量"
                        />
                      }
                      value={numeral(last_week_usage).format('0,0')}
                    />
                  }
                  contentHeight={46}
                >
                  <MiniArea color="#975FE4" data={week_usage_char} />
                </ChartCard>
              </Col>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  unit={unit_name}
                  bordered={false}
                  title={
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.month-usage"
                      defaultMessage="本月用量"
                    />
                  }
                  action={<Tooltip title={device_type_name}>{device_type_name}</Tooltip>}
                  loading={loading}
                  total={numeral(month_usage).format('0,0')}
                  footer={
                    <Field
                      label={
                        <FormattedMessage
                          id="dashboardandanalysis.analysis.last-month-usage"
                          defaultMessage="上月用量"
                        />
                      }
                      value={numeral(last_month_usage).format('0,0')}
                    />
                  }
                  contentHeight={46}
                >
                  <MiniBar data={month_usage_char} />
                </ChartCard>
              </Col>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  unit={unit_name}
                  bordered={false}
                  title={
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.year-usage"
                      defaultMessage="本年用量"
                    />
                  }
                  action={<Tooltip title={device_type_name}>{device_type_name}</Tooltip>}
                  loading={loading}
                  total={numeral(year_usage).format('0,0')}
                  footer={
                    <Field
                      label={
                        <FormattedMessage
                          id="dashboardandanalysis.analysis.last-year-usage"
                          defaultMessage="去年用量"
                        />
                      }
                      value={numeral(last_year_usage).format('0,0')}
                    />
                  }
                  contentHeight={46}
                >
                  <MiniBar data={year_usage_char} />
                </ChartCard>
              </Col>
            </Row>
          )
        })
      }
    </React.Fragment>
  );
};

export default IntroduceRow;
