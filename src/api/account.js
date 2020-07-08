import service from '../../src/utils/request'


/**
 * 登录接口
 * */ 
export function Login(data) {
    return service.request({
        url: '/login/',
        type: 'post',
        data, // 请求为post
        // params: data, // 请求为get
    })
}
/**
 * 获取验证码
 * */ 
export function GetCode(data) {
    return service.request({
        url: '/getSms/',
        type: 'post',
        data, // 请求为post
        // params: data, // 请求为get
    })
}
