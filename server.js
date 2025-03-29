const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8081 }) // 端口改为 8081

wss.on('connection', (ws) => {
  console.log('用户连接成功')

  ws.on('message', (message) => {
    console.log('收到弹幕:', message)

    // 把收到的弹幕广播给所有人
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })

  ws.on('close', () => {
    console.log('用户断开连接')
  })
})

console.log('WebSocket 服务器启动成功，监听端口 8081')
