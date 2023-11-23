const values = [3, 4, 5, 6];
const weights = [2, 3, 4, 5];
const capacity = 8;

function KnapSack(capacity, values, weights) {
  const n = values.length;

  // Crear array 2D
  const arr = new Array(n + 1);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(capacity + 1).fill(0);
  }

  // Calcular la Matriz
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= capacity; j++) {
      if (weights[i - 1] > j) {
        arr[i][j] = arr[i - 1][j];
      } else {
        arr[i][j] = Math.max(arr[i - 1][j], arr[i - 1][j - weights[i - 1]] + values[i - 1]);
      }
    }
  }
    // Matriz en la consola
    console.log("\nMatriz:");
    for (let i = 0; i <= n; i++) {
      console.log(arr[i].join(" "));
    }

   // Lista de elementos llevados
   const selectedItems = [];
   let w = capacity;
 
   for (let i = n; i > 0; i--) {
     if (arr[i][w] !== arr[i - 1][w]) {
       selectedItems.push({ value: values[i - 1], weight: weights[i - 1] });
       w -= weights[i - 1];
     }
   }
 
   // Lista de elementos llevados y el valor total
   return { selectedItems, totalValue: arr[n][capacity] };
 }
 
 const result = KnapSack(capacity, values, weights);
 console.log("\nSelected items:", result.selectedItems);
 console.log("Total value:", result.totalValue);