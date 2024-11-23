
import './HexagonProgressBar.css'

const HexagonEdgeProgressBar = ({ progress }: { progress: number }) => {
  const radius = 32
  const hexagonPerimeter = 6 * radius // 近似总边长
  const dashLength = (hexagonPerimeter * progress) / 100

  // 六边形的点定义：中心 (50,50)，半径为 radius
  const points = [
    { x: 50 + radius, y: 50 },
    { x: 50 + radius / 2, y: 50 + (Math.sqrt(3) * radius) / 2 },
    { x: 50 - radius / 2, y: 50 + (Math.sqrt(3) * radius) / 2 },
    { x: 50 - radius, y: 50 },
    { x: 50 - radius / 2, y: 50 - (Math.sqrt(3) * radius) / 2 },
    { x: 50 + radius / 2, y: 50 - (Math.sqrt(3) * radius) / 2 },
  ]

  const pointsString = points.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <div className="hexagon-progress-container">
      <svg className="hexagon" viewBox="0 0 100 100">
        {/* 灰色六边形 */}
        <polygon
          points={pointsString}
          fill="none"
          stroke="#ddd"
          strokeWidth="5"
        />
        {/* 进度条 */}
        <polygon
          points={pointsString}
          fill="none"
          stroke="blue"
          strokeWidth="5"
          strokeDasharray={`${dashLength} ${hexagonPerimeter}`}
          strokeDashoffset="0"
          style={{
            transition: 'stroke-dasharray 0.5s',
          }}
        />
      </svg>
      <div className="progress-text">{`${progress}%`}</div>
    </div>
  )
}

export default HexagonEdgeProgressBar
