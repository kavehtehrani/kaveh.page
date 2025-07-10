export interface Project {
  type: 'work' | 'hobby'
  title: string
  description?: string
  imgSrc: string
  url?: string
  repo?: string
  builtWith?: string[]
}

export interface Donate {
  title: string
  description: string
  imgSrc: string
  url?: string
}
