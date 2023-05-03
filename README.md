# pinia-make-destructurable
A modified version of [Pinia's](https://pinia.vuejs.org/) `storeToRefs` function that will also include the actions.

## Usage
```ts
import { makeStoreDestructurable } from 'pinia-make-destructurable';

const useCounterStore = defineStore('counter', () => {
  const count = ref(0);

  const increment = () => count++;

  return { count, increment };
});

const { count, increment } = makeStoreDestructurable(useCounterStore());

console.log(count.value) // 0

increment();

console.log(count.value) // 1

```