import React, {Component, PropTypes} from 'react';

// 组件只是负责接受数据，展现数据，触发的也是外面的方法，本身不对展现的数据进行操作
export default class Test extends Component {
  static propTypes = {
    count: PropTypes.number,
    increment: PropTypes.func.isRequired,
  }
  render() {
    const {count, increment} = this.props;
    return (
      <div>
        <button onClick={increment}>
          request data from server: {count};
        </button>
      </div>
    );
  }
}