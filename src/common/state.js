import storage from '@/common/localStorage'
//页面加载
export const isLoadding = { 'show': false,'text':'加载中','type':''};
//Toast提示
export const isToast = { 'show': false,'title':'温馨提示'};
//用户数据
export const userInfo = storage.getItem('user') || {};
//底部信息状态
export const isHeader = {'show':false};
//绑定手机号
export const bindphone = { 'userid':'','type':''};
//注册手机号
export const regPhone = { 'nickname':'','phone':'','codes':''};
//下注显示
export const isBet = { 'show':true};

