import * as React from 'react'

export type Ids = {
  [key: string]: {
    creating: string[]
    editing: string[]
  }
}

export const defaultIds: Ids = {
  Info: {
    creating: [],
    editing: [],
  },
  About: {
    creating: [],
    editing: [],
  },
}

type ApplicationContextValue = {
  ids: Ids
  setIds: React.Dispatch<React.SetStateAction<Ids>>
  application: {
    [key: string]: any[]
  }
  setApplication: React.Dispatch<React.SetStateAction<any>>
}

export const ApplicationContext = React.createContext<ApplicationContextValue>({
  ids: defaultIds,
  setIds: () => {},
  application: {
    About: [],
    Contact: [],
  },
  setApplication: () => {},
})

export const ApplicationProvider = ApplicationContext.Provider

export function useApplicationContext() {
  return React.useContext(ApplicationContext)
}
