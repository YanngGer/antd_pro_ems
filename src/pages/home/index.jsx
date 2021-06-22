import React, { useEffect, useState, useContext } from 'react';
import echarts from 'echarts';
import 'echarts-liquidfill';
import { cloneDeep } from 'lodash';
import { Select } from 'antd';

import PageLayout from '../../components/page-layout/PageLayout';
import SimpleSelect from '../../components/simple-select/SimpleSelect';
import request from '../../utils/request';
import EnergyTypeList from '../../components/energy-type-list/EnergyTypeList';
import DeviceList from '../../components/device-list/DeviceList';
import language from '../../utils/language';
import './HomePage.css';

const { Option } = Select;

const languageEnv = sessionStorage.languageEnv;

const energy_consumption_array = [
  { value: 0, selectText: language.week[languageEnv] },
  { value: 1, selectText: language.Month[languageEnv] },
  { value: 2, selectText: language.Year[languageEnv] },
];

let reportOption = {
  //提示框组件
  tooltip: {
    // 坐标轴触发
    trigger: 'axis',
    //坐标轴指示器配置项
    axisPointer: {
      //十字准星指示器
      type: 'cross',
      //文本标签的背景颜色
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  color: ['#fd6003', '#0044ff', '#0064ff'],
  //图例组件
  legend: {
    //图例项的 icon
    icon: 'circle',
    textStyle: {
      color: '#fff',
    },
    //图例的数据数组
    data: [],
  },
  //直角坐标系内绘图网格
  grid: {
    //grid 组件离容器左侧的距离
    left: '3%',
    right: '4%',
    //grid 组件离容器下侧的距离
    bottom: '3%',
    //grid 区域是否包含坐标轴的刻度标签
    containLabel: true,
  },
  //直角坐标系 grid 中的 x 轴
  xAxis: [
    {
      //类目轴
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      //坐标轴两边留白策略
      boundaryGap: false,
      data: [],
    },
  ],
  //直角坐标系 grid 中的 y 轴
  yAxis: {
    //数值轴，适用于连续数据
    type: 'value',
    //坐标轴刻度标签的相关设置
    axisLabel: {
      //刻度标签的内容格式器，支持字符串模板和回调函数两种形式
      formatter: '{value} kWh',
    },
    axisLine: {
      lineStyle: {
        color: '#ffffff',
      },
    },
  },
  series: [],
};
let pieChartOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
    position: [10, 10],
  },
  color: ['#ff9f7f', '#67e0e3', '#ffdb5c'],
  series: [
    {
      name: '',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '60%'],

      label: {
        show: false,
        position: 'outside',
      },
      labelLine: {
        show: false,
      },
    },
  ],
};

const HomePage = (props) => {
  const [selectListDeviceType, setSelectListDeviceType] = useState([]);
  const [currentEnergyType, setCurrentEnergyType] = useState(1);
  const [selectListArea, setSelectListArea] = useState([]);
  const [currentArea, setCurrentArea] = useState(0);
  const [currentDevice, setCurrentDevice] = useState(-1);

  const [cumulativeConsume, setCumulativeConsume] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [energyTimeRange, setEnergyTimeRange] = useState('this_week');

  useEffect(() => {
    getEnergyConsume();
    getEnergyChartData();
  }, [currentEnergyType, currentArea, currentDevice]);

  useEffect(() => {
    // setCurrentDevice(-1)
    getDeviceList();
  }, [currentEnergyType, currentArea]);

  // useEffect(() => {
  //   getDeviceList()
  // }, [])

  useEffect(() => {
    getEnergyChartData();
  }, [energyTimeRange]);

  const selectEnergy = (value) => {
    setCurrentEnergyType(value);
    setCurrentArea(0);
  };
  const selectArea = (value) => {
    setCurrentArea(value);
  };
  const energySelectTimeRange = (value) => {
    setEnergyTimeRange(value === 0 ? 'this_week' : value === 1 ? 'this_month' : 'this_year');
  };

  const getDeviceList = () => {
    if (currentArea == 0) {
      setCurrentDevice(-1);
      request(`device/?language=${languageEnv}&device_type=${currentEnergyType}`).then((res) => {
        Array.isArray(res) &&
          res.unshift({
            name: language.Alldevice[languageEnv],
            id: -1,
            alias: language.Alldevice[languageEnv],
          });
        setDeviceList(res);
      });
    } else {
      setCurrentDevice(-1);
      request(
        `device/?language=${languageEnv}&area_key=${
          currentEnergyType + '-' + currentArea
        }&device_type=${currentEnergyType}`,
      ).then((res) => {
        Array.isArray(res) &&
          res.unshift({
            name: language.Alldevice[languageEnv],
            id: -1,
            alias: language.Alldevice[languageEnv],
          });
        setDeviceList(res);
      });
    }
  };
  const getEnergyConsume = async () => {
    const res = await request(
      `energy_consumption_statistics/?device_type=${currentEnergyType}&area=${currentArea}&device_id=${
        currentDevice === -1 ? 0 : currentDevice
      }`,
    );
    if (res.status !== 0) return setCumulativeConsume([]);
    setCumulativeConsume(res);
    localStorage.setItem('title', res.company_name);
    renderPieChart(res.pie_today_data_list, 'chart-line');
    renderPieChart(res.pie_last_week_data_list, 'chart-line-week');
    renderPieChart(res.pie_last_month_data_list, 'chart-line-month');
    renderLiquidFill(res.memory_usage, 'chart-bar-1');
  };
  const getEnergyChartData = async () => {
    const res = await request(
      `energy_consumption_display/?time_range=${energyTimeRange}&area=${currentArea}&device_type=${currentEnergyType}&device_id=${
        currentDevice === -1 ? 0 : currentDevice
      }`,
    );
    renderLineChart(res, 'reportChart');
  };
  // 渲染图形
  const renderPieChart = (data, dom) => {
    // 获取元素
    const chartDom = document.getElementById(dom);
    // 如果元素为空，直接返回false
    if (!chartDom) return false;
    // 否则初始化元素，获取char对象
    const chartObject = echarts.init(chartDom);
    // 获取累计能耗echarts初始数据结构
    let initData = cloneDeep(pieChartOption);
    // 填充数据
    initData.series[0].data = data;
    // 自清除
    chartObject.clear();
    // 将数据填充到char对象中
    chartObject.setOption(initData);
  };
  const renderLineChart = (data, dom) => {
    // 获取char对象
    const reportChart = echarts.init(document.getElementById(dom));
    // 自清除
    reportChart.clear();
    // 如果响应状态不为0，char对象直接设置为空
    if (data.status !== 0) {
      reportChart.setOption({});
      return;
    }
    // 获取能耗看板echarts初始数据结构
    let chartData = cloneDeep(reportOption);
    let seriesArray = [];
    let legendData = [];
    for (const name in data.results.data_dict) {
      // 填充数据
      seriesArray.push({
        smooth: 0.6,
        // key为本周用电趋势
        name: name,
        type: 'line',
        lineStyle: {
          width: 1,
        },
        // value为列表值
        data: data.results.data_dict[name] || 0,
        areaStyle: {
          opacity: 0.6,
        },
      });
      // key为本周用电趋势
      legendData.push(name);
    }

    chartData.series = seriesArray;
    chartData.legend.data = legendData;
    // 填充x轴的列表数据
    chartData.xAxis[0].data = data.results.date_list;
    // 填充y轴的单位
    chartData.yAxis.axisLabel = {
      formatter: '{value} ' + data.results.unit || 'kWh',
    };
    // 传递数据
    reportChart.setOption(chartData);
  };
  const renderLiquidFill = (data, dom) => {
    var option = {
      // backgroundColor: '#ccc', //背景色
      series: [
        {
          type: 'liquidFill',
          color: ['#ff0000'],
          data: [data],
          name: '内存使用率',
          radius: '65%',
          itemStyle: {
            //普通样式
            opacity: 0.5,
          },
          emphasis: {
            itemStyle: {
              //悬停样式
              opacity: 0.5,
            },
          },
        },
      ],
      tooltip: {
        show: true,
      },
    };

    const chartDom = document.getElementById(dom);
    // 如果元素为空，直接返回false
    if (!chartDom) return false;
    // 否则初始化元素，获取char对象
    const chartObject = echarts.init(chartDom);
    // 获取累计能耗echarts初始数据结构
    let initData = cloneDeep(option);

    // 自清除
    chartObject.clear();
    // 将数据填充到char对象中
    chartObject.setOption(initData);
  };

  // 使用一个接口请求获取所有的能源类型，所有区域，所有设备
  const myData = {
    all_device_type: ['电', '水'],
    all_area: ['A区', 'B区'],
    all_device: ['device1', 'device2', 'device3'],
  };

  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="home-page-top-title">
          {language.Cumulativeenergyconsumption[languageEnv]}
        </div>
        <div style={{ display: 'flex' }}>
          <EnergyTypeList defaultValue={1} handleChange={selectEnergy} />

          <div style={{ marginLeft: '24px' }}>
            <DeviceList
              handleChange={selectArea}
              value={currentArea}
              deviceType={currentEnergyType}
            />
          </div>

          <div style={{ marginLeft: '24px' }}>
            <div className="search-select-module">
              <Select
                showSearch
                value={currentDevice}
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={(value) => setCurrentDevice(value)}
                defaultValue={currentDevice}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {deviceList.length &&
                  deviceList.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.alias}
                      </Option>
                    );
                  })}
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        {/*四张卡片*/}
        <div style={{ display: 'flex' }}>
          <div className="chart-item">
            <div className="chart-title">{language.TodayUsage[languageEnv]}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                {/*今日用量的值*/}
                <div className="chart-kw">{cumulativeConsume.today_energy_consumption || 0}</div>
                {/*今日用量的单位*/}
                <div className="chart-unit">{cumulativeConsume.unit}</div>
              </div>
              <div style={{ marginRight: '12px' }}>
                {/*环比增长的值*/}
                <div className="chart-percent">{cumulativeConsume.today_to_yesterday || '0%'}</div>
                {/*环比增长文字*/}
                <div className="chart-add">{language.Monthonmonthgrowth[languageEnv]}</div>
              </div>
            </div>
            {/*饼图的样式*/}
            <div id="chart-line" className="home-page-chart-table"></div>
          </div>
          <div className="chart-item">
            <div className="chart-title">{language.LastWeekUsage[languageEnv]}</div>
            <div className="chart-data flex flex-between">
              <div className="flex">
                <div className="chart-kw">{cumulativeConsume.this_week_energy_consumption}</div>
                <div className="chart-unit">{cumulativeConsume.unit}</div>
              </div>
              <div className="m-r-12">
                <div className="chart-percent">{cumulativeConsume.this_week_to_last_week}</div>
                <div className="chart-add">{language.Monthonmonthgrowth[languageEnv]}</div>
              </div>
            </div>
            <div id="chart-line-week" className="home-page-chart-table"></div>
          </div>
          <div className="chart-item">
            <div className="chart-title">{language.LastMonthUsage[languageEnv]}</div>
            <div className="chart-data flex flex-between">
              <div className="flex">
                <div className="chart-kw">{cumulativeConsume.this_month_energy_consumption}</div>
                <div className="chart-unit">{cumulativeConsume.unit}</div>
              </div>
              <div className="m-r-12">
                <div className="chart-percent">{cumulativeConsume.this_month_to_last_month}</div>
                <div className="chart-add">{language.Monthonmonthgrowth[languageEnv]}</div>
              </div>
            </div>
            <div id="chart-line-month" className="home-page-chart-table"></div>
          </div>
          <div className="chart-item">
            <div className="chart-title">{language.diskTotal[languageEnv]}</div>
            <div className="chart-data flex flex-between">
              <div className="flex">
                <div className="chart-kw">{cumulativeConsume.disk_total}</div>
                <div className="chart-unit">G</div>
              </div>
              <div className="m-r-12">
                <div className="chart-percent">{cumulativeConsume.disk_usage}</div>
                <div className="chart-add">{language.diskUsage[languageEnv]}</div>
              </div>
            </div>

            <div id="chart-bar-1" className="home-page-chart-table"></div>
          </div>
        </div>

        {/*增加设备数量，点位数量，卡片*/}

        {/*能耗看板*/}
        <div className="energy-graph flex">
          <div className="energy-report">
            <div className="flex flex-between">
              <div className="energy-proportion-title">
                {language.Energyconsumptiondata[languageEnv]}
              </div>
              <div className="flex">
                <SimpleSelect
                  defaultValue={0}
                  selectList={energy_consumption_array}
                  handleChange={energySelectTimeRange}
                />
              </div>
            </div>
            <div className="energy-report-chart">
              <div id="reportChart" className={'w-h-100'}></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
