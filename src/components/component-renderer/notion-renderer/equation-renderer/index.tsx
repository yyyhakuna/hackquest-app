import type React from 'react'
import MathJax from 'react-mathjax'
import type { ComponentRendererProp } from '../../constants/type'

type EquationRendererProp = ComponentRendererProp

const EquationRenderer: React.FC<EquationRendererProp> = ({ component }) => {
  return (
    <div datatype={component.type}>
      <MathJax.Provider>
        <span className="[&>div]:inline-block">
          <MathJax.Node formula={component.content.expression} />
        </span>
      </MathJax.Provider>
    </div>
  )
}

export default EquationRenderer
