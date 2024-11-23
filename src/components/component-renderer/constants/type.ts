export enum NotionComponentType {
  H1 = 'heading_1',
  H2 = 'heading_2',
  H3 = 'heading_3',
  H4 = 'heading_4',
  H5 = 'heading_5',
  H6 = 'heading_6',
  IMAGE = 'image',
  QUOTE = 'quote',
  TOGGLE = 'toggle',
  CODE = 'code',
  TEXT = 'text',
  NUMBERED_LIST_ITEM = 'numbered_list_item',
  BULLETED_LIST_ITEM = 'bulleted_list_item',
  /** 视频 */
  VIDEO = 'video',
  COLUMN_LIST = 'column_list',
  COLUMN = 'column',
  PARAGRAPH = 'paragraph',
  CALLOUT = 'callout',
  EQUATION = 'equation',
  BOOKMARK = 'bookmark',
  DIVIDER = 'divider',
}

export enum HeaderLevel {
  H1 = 'heading_1',
  H2 = 'heading_2',
  H3 = 'heading_3',
  H4 = 'heading_4',
  H5 = 'heading_5',
  H6 = 'heading_6',
}

export enum CustomType {
  Quiz = 'Quiz',
  QUIZ = 'QUIZ',
  QuizA = 'QuizA',
  QuizB = 'QuizB',
  QuizC = 'QuizC',
  QuizD = 'QuizD',
  Content = 'Content',
  Example = 'Example',
  Reading = 'READING',
  VIDEO = 'VIDEO',
  Video = 'Video',
  CodeFill = 'CodeFill',
  Choice = 'Choice',
  TrueFalse = 'TrueFalse',
  ImageChoice = 'ImageChoice',
  DragSort = 'DragSort',
}

export interface AnnotationsType {
  bold: boolean
  code: boolean
  color: string
  italic: boolean
  strikethrough: boolean
  underline: boolean
}

export interface LessonContent {
  left: CustomComponent[]
  right: CustomComponent[]
}

export interface NotionComponent {
  id: string
  type: NotionComponentType | CustomType
  children?: (NotionComponent | CustomComponent)[]
  content: any
  isCustomType: boolean
  isToggle: boolean
  isCompleted?: boolean
}

export interface CustomComponent {
  id: string
  type: NotionComponentType | CustomType
  children: (NotionComponent | CustomComponent)[]
  content: any
  notionType: NotionComponentType
  isCustomType: boolean
  isToggle: boolean
  title: string
  isCompleted?: boolean
}

export type ComponentRendererType = NotionComponent | CustomComponent

export interface ComponentRendererProp {
  prevComponent: ComponentRendererType | null
  nextComponent: ComponentRendererType | null
  position: number
  parent: any
  component: ComponentRendererType
  isRenderChildren?: boolean
}

export interface CodeFileComponent extends CustomComponent {
  filename: string
  isActive: boolean
  codeContent: NotionComponent
}

export interface ExampleComponent extends CustomComponent {
  renderIdeBtn: boolean
  codeFiles: CodeFileComponent[]
  ideUrl?: string
}

export interface QuizType extends CustomComponent {
  type: CustomType.Quiz
}

export enum LineType {
  /* 正常渲染的code文本 */
  DEFAULT = 'default',
  /* 单行既有文本也有Input框 */
  INSERT_INPUT = 'insert_input',
  /* 单行或多行为Input框 */
  INPUT = 'input',
  /* 注释 */
  ANNOTATION = 'annotation',
}

export interface CodeLineType {
  id: string
  type: LineType
  content: string
  lineNumber: number
  regex: string
  answers: {
    regex: string
    content: string[]
    type: LineType
  }[]
}

export interface CodeFillType extends CustomComponent {
  type: CustomType.QuizA | CustomType.CodeFill
  sourceEditorCode: object
  answerRegex: string[]
  lines: CodeLineType[]
  hint?: CustomComponent
}

export interface QuizBType extends CustomComponent {
  options: (NotionComponent & {
    type: NotionComponentType.BULLETED_LIST_ITEM
  })[]
  children: (NotionComponent & { content: { isGapFill: boolean }[] })[]
  hint?: CustomComponent
}

export interface QuizOption {
  index: number
  option: NotionComponent
}

export interface ChoiceType extends CustomComponent {
  answers: number[]
  type: CustomType.Choice | CustomType.QuizC
  children: NotionComponent[]
  hint?: CustomComponent
  options: QuizOption[]
}

export interface TrueFalseType extends CustomComponent {
  answer: boolean
  type: CustomType.TrueFalse
  children: NotionComponent[]
  hint?: CustomComponent
}

export enum ChoiceAnswerState {
  Default = 'default',
  Wrong = 'wrong',
  Correct = 'correct',
}
