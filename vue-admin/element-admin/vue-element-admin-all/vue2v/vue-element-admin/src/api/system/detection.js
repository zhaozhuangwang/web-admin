import request from '@/axios/index'

// 查询侦测设备列表
export const listDetection = query => {
  return request({
    url: '/system/device/list',
    method: 'post',
    params: query
  })
}

// 查询侦测设备详细
export const getDetection = deviceId => {
  return request({
    url: '/system/device/getInfo' + deviceId,
    method: 'get'
  })
}

// 新增侦测设备
export const addDetection = data => {
  return request({
    url: '/system/device/add',
    method: 'post',
    data: data
  })
}

// 修改侦测设备
export const updateDetection = data => {
  return request({
    url: '/system/device/edit',
    method: 'put',
    data: data
  })
}

// 删除侦测设备
export const delDetection = deviceId => {
  return request({
    url: '/system/device/delete' + deviceId,
    method: 'delete'
  })
}

// 导出侦测设备
// export const exportDetection = query => {
//   return request({
//     url: '/system/detection/export',
//     method: 'get',
//     params: query
//   })
// }
