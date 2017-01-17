import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet'; // 设置head
import { increment, fetchData } from 'redux/actions';
import { Test } from 'components';

// 绑定redux，包括方法和数据
@connect(
  state => (
    {
      count: state.test.count,
      data: state.test.data,
      fetchState: state.test.fetchState,
    }
  ), {increment, fetchData}
)
  
export default class Home extends Component {
  handler() {
    this.props.fetchData({
      data: {
        id: 1,
        account: 2
      },
      succ: this.succ,
      fail: this.fail
    })
  }
  fail() {
    console.log('fail'); // TODO demo
  }
  succ() {
    console.log('succ'); // TODO demo
  }
  render() {
    const styles = require('./Home.scss'); // styles.counterContainer，scss的用法； css则引用进来就行了，className直接写样式名对应的字符串就行
    const {count, data, fetchState} = this.props; // 所有的数据，即state都是通过redux来管理， 操作state由action来负责
    return (
      <div>
        <Helmet title="Home"/>
        <div className={styles.counterContainer}>
          <Test
            count={count} // state由redux来管理
            increment={this.props.increment} // 操作state 由action来操作
          />
          <button onClick={this.handler.bind(this)}>{`fetch data: ${JSON.stringify(data)}, state: ${fetchState}`}</button>
        </div>
      </div>
    );
  }
}