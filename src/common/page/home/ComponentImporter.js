import { createElement, Suspense, lazy, memo } from 'react'
import { atomFamily, useRecoilValue } from 'recoil'
import { widgetInfos } from './widgetInfos'

const importComponentEffect =
  () =>
  ({ setSelf, onSet, trigger, node }) => {
    const importCoponent = async () => {
      console.log('initializeAtom')
      console.log(trigger, node)
      const name = node.key.replace('importedComponent__', '').replace(/"/g, '')
      if (name) {
        setSelf({
          name,
          component: memo(lazy(() => import('../../../widget' + widgetInfos[name].location))),
        })
      }
    }
    if (trigger === 'get') importCoponent()
  }

const importedComponentState = atomFamily({
  key: 'importedComponent',
  default: { name: null, component: null },
  effects: [importComponentEffect()],
})

const Dummy = () => <div></div>

export default memo(function ComponentImporter({ name, id, index }) {
  console.log(name)
  const item = useRecoilValue(importedComponentState(name))
  console.log(item)

  return item.component && <Suspense fallback={Dummy}>{createElement(item.component || Dummy, { id, index })}</Suspense>
})
