import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import { FormattedMessage } from 'umi';
import React from 'react';
import numeral from 'numeral';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from './Charts';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';
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

const IntroduceRow = ({ loading }) => {

  const visitData = [
    {
      "x": "2021-06-21",
      "y": 7
    },
    {
      "x": "2021-06-22",
      "y": 5
    },
    {
      "x": "2021-06-23",
      "y": 4
    },
    {
      "x": "2021-06-24",
      "y": 2
    },
    {
      "x": "2021-06-25",
      "y": 4
    },
    {
      "x": "2021-06-26",
      "y": 7
    },
    {
      "x": "2021-06-27",
      "y": 5
    },
    {
      "x": "2021-06-28",
      "y": 6
    },
    {
      "x": "2021-06-29",
      "y": 5
    },
    {
      "x": "2021-06-30",
      "y": 9
    },
    {
      "x": "2021-07-01",
      "y": 6
    },
    {
      "x": "2021-07-02",
      "y": 3
    },
    {
      "x": "2021-07-03",
      "y": 1
    },
    {
      "x": "2021-07-04",
      "y": 5
    },
    {
      "x": "2021-07-05",
      "y": 3
    },
    {
      "x": "2021-07-06",
      "y": 6
    },
    {
      "x": "2021-07-07",
      "y": 5
    }
  ]

  const deviceTypeName = '电'
  const todayUsage = 1234
  const yesterdayUsage = 1231
  const unit = "KWh"
  const dayHB = "12%"
  const dayHBIsUpOrDown = "up"
  const dayTB = "15%"
  const dayTBIsUpOrDown = "down"

  return (
    <React.Fragment>
      <Row
        gutter={24}
      >
        <Col {...topColResponsiveProps}>
          <ChartCard
            unit={unit}
            bordered={false}
            title={
              <FormattedMessage
                id="dashboardandanalysis.analysis.today-usage"
                defaultMessage="今日用量"
              />
            }
            action={
              <Tooltip
                title={deviceTypeName}
                // title={
                //   <FormattedMessage
                //     id="dashboardandanalysis.analysis.introduce"
                //     defaultMessage="Introduce"
                //   />
                // }
              >
                {/*<InfoCircleOutlined />*/}
                {deviceTypeName}
              </Tooltip>
            }
            loading={loading}
            total={numeral(todayUsage).format('0,0')}
            footer={
              <Field
                label={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.yesterday-usage"
                    defaultMessage="昨日用量"
                  />
                }
                value={numeral(yesterdayUsage).format('0,0')}
              />
            }
            contentHeight={46}
          >
            <Trend
              flag={dayHBIsUpOrDown}
              style={{
                marginRight: 16,
              }}
            >
              <FormattedMessage
                id="dashboardandanalysis.analysis.day-hb"
                defaultMessage="日环比"
              />
              <span className={styles.trendText}>{dayHB}</span>
            </Trend>
            <Trend flag={dayTBIsUpOrDown}>
              <FormattedMessage id="dashboardandanalysis.analysis.day-tb" defaultMessage="日同比" />
              <span className={styles.trendText}>{dayTB}</span>
            </Trend>
          </ChartCard>
        </Col>

        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            loading={loading}
            title={
              <FormattedMessage id="dashboardandanalysis.analysis.visits" defaultMessage="Visits" />
            }
            action={
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.introduce"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={numeral(8846).format('0,0')}
            footer={
              <Field
                label={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.day-visits"
                    defaultMessage="Daily Visits"
                  />
                }
                value={numeral(1234).format('0,0')}
              />
            }
            contentHeight={46}
          >
            <MiniArea color="#975FE4" data={visitData} />
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            loading={loading}
            title={
              <FormattedMessage id="dashboardandanalysis.analysis.payments" defaultMessage="Payments" />
            }
            action={
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.introduce"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={numeral(6560).format('0,0')}
            footer={
              <Field
                label={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.conversion-rate"
                    defaultMessage="Conversion Rate"
                  />
                }
                value="60%"
              />
            }
            contentHeight={46}
          >
            <MiniBar data={visitData} />
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            loading={loading}
            bordered={false}
            title={
              <FormattedMessage
                id="dashboardandanalysis.analysis.operational-effect"
                defaultMessage="Operational Effect"
              />
            }
            action={
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.introduce"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            total="78%"
            footer={
              <div
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                <Trend
                  flag="up"
                  style={{
                    marginRight: 16,
                  }}
                >
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.week"
                    defaultMessage="Weekly Changes"
                  />
                  <span className={styles.trendText}>12%</span>
                </Trend>
                <Trend flag="down">
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.day"
                    defaultMessage="Weekly Changes"
                  />
                  <span className={styles.trendText}>11%</span>
                </Trend>
              </div>
            }
            contentHeight={46}
          >
            <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
          </ChartCard>
        </Col>
      </Row>
      <Row
        gutter={24}
      >
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title={
              <FormattedMessage
                id="dashboardandanalysis.analysis.total-sales"
                defaultMessage="Total Sales"
              />
            }
            action={
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.introduce"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            loading={loading}
            total={() => <Yuan>126560</Yuan>}
            footer={
              <Field
                label={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.day-sales"
                    defaultMessage="Daily Sales"
                  />
                }
                value={`￥${numeral(12423).format('0,0')}`}
              />
            }
            contentHeight={46}
          >
            <Trend
              flag="up"
              style={{
                marginRight: 16,
              }}
            >
              <FormattedMessage
                id="dashboardandanalysis.analysis.week"
                defaultMessage="Weekly Changes"
              />
              <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down">
              <FormattedMessage id="dashboardandanalysis.analysis.day" defaultMessage="Daily Changes" />
              <span className={styles.trendText}>11%</span>
            </Trend>
          </ChartCard>
        </Col>

        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            loading={loading}
            title={
              <FormattedMessage id="dashboardandanalysis.analysis.visits" defaultMessage="Visits" />
            }
            action={
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.introduce"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={numeral(8846).format('0,0')}
            footer={
              <Field
                label={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.day-visits"
                    defaultMessage="Daily Visits"
                  />
                }
                value={numeral(1234).format('0,0')}
              />
            }
            contentHeight={46}
          >
            <MiniArea color="#975FE4" data={visitData} />
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            loading={loading}
            title={
              <FormattedMessage id="dashboardandanalysis.analysis.payments" defaultMessage="Payments" />
            }
            action={
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.introduce"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={numeral(6560).format('0,0')}
            footer={
              <Field
                label={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.conversion-rate"
                    defaultMessage="Conversion Rate"
                  />
                }
                value="60%"
              />
            }
            contentHeight={46}
          >
            <MiniBar data={visitData} />
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            loading={loading}
            bordered={false}
            title={
              <FormattedMessage
                id="dashboardandanalysis.analysis.operational-effect"
                defaultMessage="Operational Effect"
              />
            }
            action={
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.introduce"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            total="78%"
            footer={
              <div
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                <Trend
                  flag="up"
                  style={{
                    marginRight: 16,
                  }}
                >
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.week"
                    defaultMessage="Weekly Changes"
                  />
                  <span className={styles.trendText}>12%</span>
                </Trend>
                <Trend flag="down">
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.day"
                    defaultMessage="Weekly Changes"
                  />
                  <span className={styles.trendText}>11%</span>
                </Trend>
              </div>
            }
            contentHeight={46}
          >
            <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
          </ChartCard>
        </Col>
      </Row>
      <Row
        gutter={24}
      >
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title={
              <FormattedMessage
                id="dashboardandanalysis.analysis.total-sales"
                defaultMessage="Total Sales"
              />
            }
            action={
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.introduce"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            loading={loading}
            total={() => <Yuan>126560</Yuan>}
            footer={
              <Field
                label={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.day-sales"
                    defaultMessage="Daily Sales"
                  />
                }
                value={`￥${numeral(12423).format('0,0')}`}
              />
            }
            contentHeight={46}
          >
            <Trend
              flag="up"
              style={{
                marginRight: 16,
              }}
            >
              <FormattedMessage
                id="dashboardandanalysis.analysis.week"
                defaultMessage="Weekly Changes"
              />
              <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down">
              <FormattedMessage id="dashboardandanalysis.analysis.day" defaultMessage="Daily Changes" />
              <span className={styles.trendText}>11%</span>
            </Trend>
          </ChartCard>
        </Col>

        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            loading={loading}
            title={
              <FormattedMessage id="dashboardandanalysis.analysis.visits" defaultMessage="Visits" />
            }
            action={
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.introduce"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={numeral(8846).format('0,0')}
            footer={
              <Field
                label={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.day-visits"
                    defaultMessage="Daily Visits"
                  />
                }
                value={numeral(1234).format('0,0')}
              />
            }
            contentHeight={46}
          >
            <MiniArea color="#975FE4" data={visitData} />
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            loading={loading}
            title={
              <FormattedMessage id="dashboardandanalysis.analysis.payments" defaultMessage="Payments" />
            }
            action={
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.introduce"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={numeral(6560).format('0,0')}
            footer={
              <Field
                label={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.conversion-rate"
                    defaultMessage="Conversion Rate"
                  />
                }
                value="60%"
              />
            }
            contentHeight={46}
          >
            <MiniBar data={visitData} />
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            loading={loading}
            bordered={false}
            title={
              <FormattedMessage
                id="dashboardandanalysis.analysis.operational-effect"
                defaultMessage="Operational Effect"
              />
            }
            action={
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.introduce"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            total="78%"
            footer={
              <div
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                <Trend
                  flag="up"
                  style={{
                    marginRight: 16,
                  }}
                >
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.week"
                    defaultMessage="Weekly Changes"
                  />
                  <span className={styles.trendText}>12%</span>
                </Trend>
                <Trend flag="down">
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.day"
                    defaultMessage="Weekly Changes"
                  />
                  <span className={styles.trendText}>11%</span>
                </Trend>
              </div>
            }
            contentHeight={46}
          >
            <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
          </ChartCard>
        </Col>
      </Row>
      <Row
        gutter={24}
      >
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title={
              <FormattedMessage
                id="dashboardandanalysis.analysis.total-sales"
                defaultMessage="Total Sales"
              />
            }
            action={
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.introduce"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            loading={loading}
            total={() => <Yuan>126560</Yuan>}
            footer={
              <Field
                label={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.day-sales"
                    defaultMessage="Daily Sales"
                  />
                }
                value={`￥${numeral(12423).format('0,0')}`}
              />
            }
            contentHeight={46}
          >
            <Trend
              flag="up"
              style={{
                marginRight: 16,
              }}
            >
              <FormattedMessage
                id="dashboardandanalysis.analysis.week"
                defaultMessage="Weekly Changes"
              />
              <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down">
              <FormattedMessage id="dashboardandanalysis.analysis.day" defaultMessage="Daily Changes" />
              <span className={styles.trendText}>11%</span>
            </Trend>
          </ChartCard>
        </Col>

        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            loading={loading}
            title={
              <FormattedMessage id="dashboardandanalysis.analysis.visits" defaultMessage="Visits" />
            }
            action={
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.introduce"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={numeral(8846).format('0,0')}
            footer={
              <Field
                label={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.day-visits"
                    defaultMessage="Daily Visits"
                  />
                }
                value={numeral(1234).format('0,0')}
              />
            }
            contentHeight={46}
          >
            <MiniArea color="#975FE4" data={visitData} />
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            loading={loading}
            title={
              <FormattedMessage id="dashboardandanalysis.analysis.payments" defaultMessage="Payments" />
            }
            action={
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.introduce"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={numeral(6560).format('0,0')}
            footer={
              <Field
                label={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.conversion-rate"
                    defaultMessage="Conversion Rate"
                  />
                }
                value="60%"
              />
            }
            contentHeight={46}
          >
            <MiniBar data={visitData} />
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            loading={loading}
            bordered={false}
            title={
              <FormattedMessage
                id="dashboardandanalysis.analysis.operational-effect"
                defaultMessage="Operational Effect"
              />
            }
            action={
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.introduce"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
            }
            total="78%"
            footer={
              <div
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                <Trend
                  flag="up"
                  style={{
                    marginRight: 16,
                  }}
                >
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.week"
                    defaultMessage="Weekly Changes"
                  />
                  <span className={styles.trendText}>12%</span>
                </Trend>
                <Trend flag="down">
                  <FormattedMessage
                    id="dashboardandanalysis.analysis.day"
                    defaultMessage="Weekly Changes"
                  />
                  <span className={styles.trendText}>11%</span>
                </Trend>
              </div>
            }
            contentHeight={46}
          >
            <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
          </ChartCard>
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default IntroduceRow;
