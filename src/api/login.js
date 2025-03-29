// src/api/login.js
import request from '@/utils/request'

export const loginApi = async (email, password) => {
  console.log('email:', email) // 确保用户名值不为空
  console.log('Password:', password)

  // 通过 GET 请求获取所有用户
  const response = await request.get('/users') // 获取到假数据中的所有用户
  // console.log('返回的数据:', response)
  // 查找与传入的用户名和密码匹配的用户
  const user = response.find(u => u.email === email && u.password === password)

  // 如果没有找到用户，则返回错误
  if (!user) {
    throw new Error('账号或密码错误')
  }

  // 如果找到用户，返回用户数据
  return user
}

export default loginApi
