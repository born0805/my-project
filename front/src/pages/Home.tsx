import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>欢迎来到聚米喵</h1>
        <p>这是一个基于 Spring Boot + React 的全栈项目</p>
        <div className="tech-stack">
          <div className="tech-item">
            <h3>后端技术</h3>
            <ul>
              <li>Spring Boot 3.2.0</li>
              <li>MyBatis Plus</li>
              <li>MySQL 8.0</li>
            </ul>
          </div>
          <div className="tech-item">
            <h3>前端技术</h3>
            <ul>
              <li>React 18</li>
              <li>TypeScript</li>
              <li>Vite</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home






