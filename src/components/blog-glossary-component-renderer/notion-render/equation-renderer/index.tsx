import type { FC } from 'react'
import MathJax from 'react-mathjax'
import type { CustomComponent } from '../../type'
import type { NotionComponent } from '../type'

interface EquationRendererProps {
  prevComponent: NotionComponent | CustomComponent | null
  nextComponent: NotionComponent | CustomComponent | null
  position: number
  component: NotionComponent
  parent: any
}

const EquationRenderer: FC<EquationRendererProps> = props => {
  const { component } = props
  return (
    // <MathJax.Provider datatype={component.type}>
    <MathJax.Provider>
      <span className="[&>div]:inline-block">
        <MathJax.Node formula={component.content.expression} />
      </span>
    </MathJax.Provider>
  )
}

export default EquationRenderer
