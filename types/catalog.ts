export interface Formats {
  local: boolean
  online: boolean
  home: boolean
}

export interface Filters {
  schedule: null | string
  formats: Formats
}
