import {ToRef, ToRefs,Ref,ComputedRef, toRaw, isRef, isReactive, toRef} from 'vue'
import {StoreGeneric, StoreState, StoreGetters, PiniaCustomStateProperties, StoreActions} from 'pinia'

type ToComputedRefs<T> = {
  [K in keyof T]: ToRef<T[K]> extends Ref<infer U>
    ? ComputedRef<U>
    : ToRef<T[K]>
}

type StoreToRefsWithActions<SS extends StoreGeneric> = ToRefs<
  StoreState<SS> & PiniaCustomStateProperties<StoreState<SS>>
> &
  ToComputedRefs<StoreGetters<SS>>
  & StoreActions<SS>

export function makeStoreDestructurable<SS extends StoreGeneric>(
  store: SS
) : StoreToRefsWithActions<SS> {
  store = toRaw(store)

  const refs = {} as StoreToRefsWithActions<SS>
  for (const key in store) {
    const value = store[key]
    if (isRef(value) || isReactive(value)) {
      // @ts-expect-error: the key is state or getter
      refs[key] = toRef(store, key)
    } else if(typeof value === 'function') {
      // @ts-expect-error: the key is an action
      refs[key] = value
    }
  }

  return refs
}