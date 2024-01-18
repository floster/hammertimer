interface LocalStorageAPI {
  set: (key: string, value: any) => void
  get: (key: string) => any
  remove: (key: string) => void
  update: (key: string, newValue: any) => void
}

export default function useLocalStorage(): LocalStorageAPI {
  const set = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const get = (key: string): any => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  const remove = (key: string): void => {
    localStorage.removeItem(key)
  }

  // update is a combination of remove and set
  const update = (key: string, newValue: any): void => {
    remove(key)
    set(key, newValue)
  }

  return {
    set,
    get,
    remove,
    update
  }
}
