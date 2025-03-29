// src/api.js
import axios from 'axios'

// 获取用户数据
export const getUsers = async () => {
  try {
    const response = await axios.get('https://67e68b326530dbd311106be9.mockapi.io/users')
    return response.data // 返回用户数据
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

// 获取留言数据
export const getMessages = async () => {
  try {
    const response = await axios.get('https://67e68b326530dbd311106be9.mockapi.io/messages')
    return response.data // 返回留言数据
  } catch (error) {
    console.error('Error fetching messages:', error)
    throw error
  }
}
