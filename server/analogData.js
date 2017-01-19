const data = [
  {
    url: 'api/auth/role',
    data: {
      status: {
        code: 0,
        msg: 'request success'
      },
      data: [
        {
          _id: '1',
          name: '123',
        }, {
          _id: '2',
          name: '123',
        }, {
          _id: '3',
          name: '789',
        }, {
          _id: '4',
          name: '789',
        }
      ]
    }
  },
  {
    url: 'api/auth/permissons',
    data: {
      status: {
        code: 0,
        msg: 'request success'
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
        msg: 'request success'
      },
      data: [
        {
          _id: '1',
          accountId: 'a4',
          name: 32,
          role: 'New York No. 1 Lake Park',
          status: 0,
        }, {
          _id: '2',
          accountId: 'b4',
          name: 42,
          role: 'London No. 1 Lake Park',
          status: 0,
        }, {
          _id: '3',
          accountId: 'c4',
          name: 32,
          role: 'Sidney No. 1 Lake Park',
          status: 1,
        }, {
          _id: '4',
          accountId: 'd4',
          name: 32,
          role: 'London No. 2 Lake Park',
          status: 1,
        }, {
          _id: '5',
          accountId: 'e4',
          name: 32,
          role: 'London No. 2 Lake Park',
          status: 1,
        },
        {
          _id: '6',
          accountId: 'a3',
          name: 32,
          role: 'New York No. 1 Lake Park',
          status: 0,
        }, {
          _id: '7',
          accountId: 'b3',
          name: 42,
          role: 'London No. 1 Lake Park',
          status: 0,
        }, {
          _id: '8',
          accountId: 'c3',
          name: 32,
          role: 'Sidney No. 1 Lake Park',
          status: 1,
        }, {
          _id: '9',
          accountId: 'd4',
          name: 32,
          role: 'London No. 2 Lake Park',
          status: 1,
        }, {
          _id: '10',
          accountId: 'e3',
          name: 32,
          role: 'London No. 2 Lake Park',
          status: 1,
        }, {
          _id: '11',
          accountId: 'a2',
          name: 32,
          role: 'New York No. 1 Lake Park',
          status: 0,
        }, {
          _id: '12',
          accountId: 'b2',
          name: 42,
          role: 'London No. 1 Lake Park',
          status: 0,
        }, {
          _id: '13',
          accountId: 'c2',
          name: 32,
          role: 'Sidney No. 1 Lake Park',
          status: 1,
        }, {
          _id: '14',
          accountId: 'd2',
          name: 32,
          role: 'London No. 2 Lake Park',
          status: 1,
        }, {
          _id: '15',
          accountId: 'e2',
          name: 32,
          role: 'London No. 2 Lake Park',
          status: 1,
        }, {
          _id: '16',
          accountId: 'a1',
          name: 32,
          role: 'New York No. 1 Lake Park',
          status: 0,
        }, {
          _id: '17',
          accountId: 'b1',
          name: 42,
          role: 'London No. 1 Lake Park',
          status: 0,
        }, {
          _id: '18',
          accountId: 'c1',
          name: 32,
          role: 'Sidney No. 1 Lake Park',
          status: 1,
        }, {
          _id: '19',
          accountId: 'd1',
          name: 32,
          role: 'London No. 2 Lake Park',
          status: 1,
        }, {
          _id: '20',
          accountId: 'e1',
          name: 32,
          role: 'London No. 2 Lake Park',
          status: 1,
        }
      ]
    }
  },
  {
    url: 'api/auth/mgmt_accountId/change_password',
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
          "accountIdId": "tester",
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

