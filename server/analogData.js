const data = [
  {
    url: 'api/auth/role',
    data: {
      status: {
        code: 0,
        msg: 'request fail'
      },
      data: [
        {
          key: '1',
          role: '123',
        }, {
          key: '2',
          role: '123',
        }, {
          key: '3',
          role: '789',
        }, {
          key: '4',
          role: '789',
        }
      ]
    }
  },
  {
    url: 'api/auth/permissons',
    data: {
      status: {
        code: 0,
        msg: 'request fail'
      },
      data: [
        {
          _id: 1,
          name: '权限模块1',
          permissions: [
            {
              _id: 1,
              name: '普通权限1',
              code: 1234,
            },
            {
              _id: 2,
              name: '普通权限2',
              code: 1234,
            },
            {
              _id: 3,
              name: '普通权限3',
              code: 1234,
            },
            {
              _id: 4,
              name: '普通权限4',
              code: 1234,
            },
          ]
        },
        {
          _id: 2,
          name: '权限模块2',
          permissions: [
            {
              _id: 1,
              name: '普通权限5',
              code: 1234,
            },
            {
              _id: 2,
              name: '普通权限6',
              code: 1234,
            },
            {
              _id: 3,
              name: '普通权限7',
              code: 1234,
            },
            {
              _id: 4,
              name: '普通权限8',
              code: 1234,
            },
          ]
        }
      ]
    }
  },
  {
    url: 'api/auth/user',
    data: {
      status: {
        code: 0,
        msg: 'request fail'
      },
      data: [
        {
          key: '1',
          account: 'a4',
          name: 32,
          address: 'New York No. 1 Lake Park',
          status: 0,
        }, {
          key: '2',
          account: 'b4',
          name: 42,
          address: 'London No. 1 Lake Park',
          status: 0,
        }, {
          key: '3',
          account: 'c4',
          name: 32,
          address: 'Sidney No. 1 Lake Park',
          status: 1,
        }, {
          key: '4',
          account: 'd4',
          name: 32,
          address: 'London No. 2 Lake Park',
          status: 1,
        }, {
          key: '5',
          account: 'e4',
          name: 32,
          address: 'London No. 2 Lake Park',
          status: 1,
        },
        {
          key: '6',
          account: 'a3',
          name: 32,
          address: 'New York No. 1 Lake Park',
          status: 0,
        }, {
          key: '7',
          account: 'b3',
          name: 42,
          address: 'London No. 1 Lake Park',
          status: 0,
        }, {
          key: '8',
          account: 'c3',
          name: 32,
          address: 'Sidney No. 1 Lake Park',
          status: 1,
        }, {
          key: '9',
          account: 'd4',
          name: 32,
          address: 'London No. 2 Lake Park',
          status: 1,
        }, {
          key: '10',
          account: 'e3',
          name: 32,
          address: 'London No. 2 Lake Park',
          status: 1,
        }, {
          key: '11',
          account: 'a2',
          name: 32,
          address: 'New York No. 1 Lake Park',
          status: 0,
        }, {
          key: '12',
          account: 'b2',
          name: 42,
          address: 'London No. 1 Lake Park',
          status: 0,
        }, {
          key: '13',
          account: 'c2',
          name: 32,
          address: 'Sidney No. 1 Lake Park',
          status: 1,
        }, {
          key: '14',
          account: 'd2',
          name: 32,
          address: 'London No. 2 Lake Park',
          status: 1,
        }, {
          key: '15',
          account: 'e2',
          name: 32,
          address: 'London No. 2 Lake Park',
          status: 1,
        }, {
          key: '16',
          account: 'a1',
          name: 32,
          address: 'New York No. 1 Lake Park',
          status: 0,
        }, {
          key: '17',
          account: 'b1',
          name: 42,
          address: 'London No. 1 Lake Park',
          status: 0,
        }, {
          key: '18',
          account: 'c1',
          name: 32,
          address: 'Sidney No. 1 Lake Park',
          status: 1,
        }, {
          key: '19',
          account: 'd1',
          name: 32,
          address: 'London No. 2 Lake Park',
          status: 1,
        }, {
          key: '20',
          account: 'e1',
          name: 32,
          address: 'London No. 2 Lake Park',
          status: 1,
        }
      ]
    }
  },
  {
    url: 'api/auth/mgmt_account/change_password',
    data: {
      status: {
        code: 0,
        msg: 'request success'
      }
    }
  },
  {
    url: '/api/user/login',
    data: {
      "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFsbSI6Im1hbmFnZW1lbnQtdXNlciIsImlhdCI6MTQ4NDYxODgyNiwi",
        "user": {
          "_id": "587889400329f31e23d9ef24",
          "accountId": "tester",
          "name": "tester",
          "status": 1,
          "role": "daddy",
          "__v": 0
        }
      },
      "status": {
        "code": 0,
        "msg": "request success"
      }
    }
  },
  {
    url: '/api/auth/user/logout',
    data: {
      "data": {
        "success": true
      },
      "status": {
        "code": 0,
        "msg": "request success"
      }
    }
  }
];
export default function(req, res) {
  const nowRequest = data.find(item=>req.url.endsWith(item.url));
  if (nowRequest) {
    res.json(nowRequest.data);
    return true;
  } else {
    return false;
  }
}

