import { useEffect, useState } from 'react'
import { User } from '../types/user'
import { userService } from '../services/userService'
import './UserList.css'

function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const data = await userService.getUserList()
      setUsers(data)
    } catch (error) {
      console.error('加载用户列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  return (
    <div className="user-list">
      <div className="page-header">
        <h2>用户管理</h2>
        <button className="btn-primary" onClick={loadUsers}>
          刷新
        </button>
      </div>
      
      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>用户名</th>
              <th>邮箱</th>
              <th>昵称</th>
              <th>创建时间</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty">暂无数据</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email || '-'}</td>
                  <td>{user.nickname || '-'}</td>
                  <td>{user.createTime ? new Date(user.createTime).toLocaleString() : '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList






