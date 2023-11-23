const values = [3, 4, 5, 6];
const weights = [2, 3, 4, 5];
const capacity = 8;

function KnapSack(capacity, values, weights) {
  const n = values.length;

  // Crear arrays 2D
  const arr = new Array(n + 1);
  const selectedElements = new Array(n + 1).fill(null).map(() => new Array(capacity + 1).fill(false));

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(capacity + 1).fill(0);
  }

  // Calcular la matriz
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= capacity; j++) {
      if (weights[i - 1] > j) {
        arr[i][j] = arr[i - 1][j];
      } else {
        const withoutCurrentItem = arr[i - 1][j];
        const withCurrentItem = arr[i - 1][j - weights[i - 1]] + values[i - 1];

        if (withCurrentItem > withoutCurrentItem) {
          arr[i][j] = withCurrentItem;
          selectedElements[i][j] = true;
        } else {
          arr[i][j] = withoutCurrentItem;
        }
      }
    }
  }

  // Lista de elementos llevados y no llevados
  const selectedItems = [];
  const unselectedItems = [];

  let w = capacity;
  for (let i = n; i > 0; i--) {
    if (selectedElements[i][w]) {
      selectedItems.push({ value: values[i - 1], weight: weights[i - 1] });
      w -= weights[i - 1];
    } else {
      unselectedItems.push({ value: values[i - 1], weight: weights[i - 1] });
    }
  }

  // Devolver los resultados
  return {
    maxValue: arr[n][capacity],
    selectedItems: selectedItems.reverse(),
    unselectedItems: unselectedItems.reverse(),
  };
}

const result = KnapSack(capacity, values, weights);
console.log("\nMaximum value:", result.maxValue, "\n");
console.log("Selected Items:", result.selectedItems, "\n");
console.log("Unselected Items:", result.unselectedItems, "\n");