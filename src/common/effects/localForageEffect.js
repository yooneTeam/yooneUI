import localforage from 'localforage'

export const localForageEffect =
  () =>
  ({ setSelf, onSet, trigger, node }) => {
    const loadPersisted = async () => {
      const savedValue = await localforage.getItem(node.key)
      if (savedValue != null) setSelf(JSON.parse(savedValue))
    }

    if (trigger === 'get') loadPersisted()

    onSet((newValue, _, isReset) => {
      isReset ? localforage.removeItem(node.key) : localforage.setItem(node.key, JSON.stringify(newValue))
    })
  }
