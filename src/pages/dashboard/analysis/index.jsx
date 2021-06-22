import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'umi';

import IntroduceRow from './components/IntroduceRow';

class Analysis extends Component {
  reqRef = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dashboardAndanalysis/fetch',
      });
    });
  }

  // componentWillUnmount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'dashboardAndanalysis/clear',
  //   });
  //   cancelAnimationFrame(this.reqRef);
  // }

  render() {
    const { dashboardAndanalysis, loading } = this.props;
    return (
      <GridContent>
        <React.Fragment>
          <IntroduceRow loading={loading} visitData={dashboardAndanalysis} />
        </React.Fragment>
      </GridContent>
    );
  }
}

export default connect(({ dashboardAndanalysis, loading }) => ({
  dashboardAndanalysis,
  loading: loading.effects['dashboardAndanalysis/fetch'],
}))(Analysis);
