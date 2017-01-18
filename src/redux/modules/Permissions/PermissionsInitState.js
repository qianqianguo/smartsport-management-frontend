const initialState = {
  count: 0,
  data: [
    {
      _id: 1,
      name: '权限模块一',
      permissions: [
        {
          _id: 1,
          name: '普通权限',
          code: 1234,
        },
        {
          _id: 2,
          name: '普通权限',
          code: 1234,
        },
        {
          _id: 3,
          name: '普通权限',
          code: 1234,
        },
        {
          _id: 4,
          name: '普通权限',
          code: 1234,
        },
      ]
    },
    {
      _id: 2,
      name: '权限模块二',
      permissions: [
        {
          _id: 1,
          name: '普通权限',
          code: 1234,
        },
        {
          _id: 2,
          name: '普通权限',
          code: 1234,
        },
        {
          _id: 3,
          name: '普通权限',
          code: 1234,
        },
        {
          _id: 4,
          name: '普通权限',
          code: 1234,
        },
      ]
    }
  ],
  fetchState: ''
};
export default initialState;