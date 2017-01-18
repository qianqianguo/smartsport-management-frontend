const initialState = {
  count: 0,
  data: [
    {
      key: '1',
      account: 'John Brown',
      name: 32,
      address: 'New York No. 1 Lake Park',
      status: 0,
    }, {
      key: '2',
      account: 'Jim Green',
      name: 42,
      address: 'London No. 1 Lake Park',
      status: 0,
    }, {
      key: '3',
      account: 'Joe Black',
      name: 32,
      address: 'Sidney No. 1 Lake Park',
      status: 1,
    }, {
      key: '4',
      account: 'Jim Red',
      name: 32,
      address: 'London No. 2 Lake Park',
      status: 1,
    }, {
      key: '5',
      account: 'Jim Red',
      name: 32,
      address: 'London No. 2 Lake Park',
      status: 1,
    }
  ],
  fetchState: '',
  searchText: '',
  limit: 10,
  filterDropdownVisible: false,
};
export default initialState;