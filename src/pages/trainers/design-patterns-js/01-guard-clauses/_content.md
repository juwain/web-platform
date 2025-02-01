---
layout: ../../../../layouts/ContentLayout.astro
title: "«Защитные» условия"
---

Guard Clauses («защитные» условия) — это техника, помогающая избежать глубокой вложенности условий. Вместо того чтобы вкладывать условия друг в друга, условия проверяются в начале функции и выполнение функции прекращается, если условия не выполняются. Это делает код более читаемым и понятным, особенно в сложных условиях.

Также, там где можно не писать `else`, лучше его не писать.

Было:

```js
function calculateDiscount(price, discount, isMember) {
  if (discount > 0) {
    if (discount < 100) {
      const resultPrice = price - (price * discount) / 100;

      if (isMember) {
        return resultPrice * 0.9;
      } else {
        return resultPrice;
      }
    }
  }

  return price;
}
```

Стало:

```js
function calculateDiscount(price, discount, isMember) {
  if (discount <= 0) return price;
  if (discount >= 100) return price;

  const resultPrice = price - (price * discount) / 100;

  if (isMember) {
    return resultPrice * 0.9;
  }

  return resultPrice;
}
```
