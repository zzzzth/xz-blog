import request from '@/utils/request'

export const registerApi = async (username, password, email) => {
  try {
    console.log('Username:', username)
    console.log('Password:', password)
    console.log('Email:', email)

    // 发送 POST 请求
    const response = await request.post('/users', {
      username,
      password,
      email
    })
    console.log('注册成功，返回的数据:', response) // 输出注册成功的响应数据
    return response
  } catch (error) {
    // 捕获错误并返回错误信息
    console.error('注册请求失败:', error.response || error.message)
    throw new Error('注册失败，请稍后再试')
  }
}

// 用户名规范
export const validUsername = async username => {
  // 校验用户名长度
  if (username.length > 8) {
    return '用户名不能超过8位'
  }

  try {
    const response = await request.get('/users') // 获取所有用户数据
    // 在返回的用户列表中查找是否有重复的用户名
    const existUser = response.find(user => user.username === username)
    if (existUser) {
      return '用户名已存在'
    }

    return true // 返回true表示用户名是有效的
  } catch (error) {
    console.error('检查用户名时出错', error)
    return '用户名校验失败'
  }
}

// 邮箱规范
export const vaildEmail = async email => {
  const response = await request.get('/users')
  const emailCheck = response.find(user => user.email === email)
  if (emailCheck) {
    return '邮箱名已经被注册'
  }
  // 校验邮箱格式，使用正则表达式
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  if (!emailRegex.test(email)) {
    return '请输入有效的邮箱地址'
  }
  if (emailCheck) {
    return '该邮箱已被注册'
  }
  return true
}

// 校验密码
export function validatePassword (password) {
  const minLength = 6
  const maxLength = 20
  if (password.length < minLength || password.length > maxLength) {
    return `密码长度应为 ${minLength} 到 ${maxLength} 个字符`
  }
  // 可以添加复杂度校验，例如包含字母和数字
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/
  if (!regex.test(password)) {
    return '密码必须包含字母和数字'
  }
  return true
}

export default registerApi
