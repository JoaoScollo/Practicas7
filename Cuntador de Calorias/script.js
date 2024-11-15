// Elementos del DOM
const calorieCounter = document.getElementById('calorie-counter'); // Contenedor del formulario de conteo de calorías
const budgetNumberInput = document.getElementById('budget'); // Campo de entrada para el presupuesto de calorías
const entryDropdown = document.getElementById('entry-dropdown'); // Menú desplegable para seleccionar el tipo de entrada (desayuno, almuerzo, etc.)
const addEntryButton = document.getElementById('add-entry'); // Botón para agregar una nueva entrada
const clearButton = document.getElementById('clear'); // Botón para limpiar el formulario
const output = document.getElementById('output'); // Contenedor para mostrar los resultados del cálculo

// Estado
let isError = false; // Variable para manejar errores en la entrada de datos

// Función para limpiar entradas
function cleanInputString(str) {
  const regex = /[+-\s]/g; // Expresión regular para eliminar caracteres no deseados
  return str.replace(regex, ''); // Devuelve la cadena limpia
}

// Verificar entradas inválidas
function isInvalidInput(str) {
  const regex = /\d+e\d+/i; // Expresión regular para detectar entradas en notación científica
  return str.match(regex); // Devuelve un match si la entrada es inválida
}

// Función para agregar entrada
function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`); // Selecciona el contenedor de entrada correspondiente
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1; // Cuenta el número de entradas existentes

  // Crea un nuevo bloque de HTML para la entrada
  const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entrada ${entryNumber} Nombre</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Nombre" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entrada ${entryNumber} Calorías</label>
    <input
      type="number"
      id="${entryDropdown.value}-${entryNumber}-calories"
      placeholder="Calorías"
      min="0"
    />
  `;

  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString); // Inserta el nuevo bloque de entrada en el contenedor
}

// Obtener calorías de entradas
function getCaloriesFromInputs(list) {
  let calories = 0; // Inicializa el contador de calorías
  for (const item of list) {
    const currVal = cleanInputString(item.value); // Limpia la cadena de entrada
    const invalidInputMatch = isInvalidInput(currVal); // Verifica si la entrada es inválida

    if (invalidInputMatch) {
      alert(`Entrada inválida: ${invalidInputMatch[0]}`); // Muestra una alerta si la entrada es inválida
      isError = true; // Marca el estado de error
      return null; // Sale de la función
    }
    calories += Number(currVal); // Suma las calorías válidas
  }
  return calories; // Devuelve el total de calorías
}

// Función para calcular calorías
function calculateCalories(e) {
  e.preventDefault(); // Previene el comportamiento por defecto del formulario
  isError = false; // Resetea el estado de error

  // Obtiene las calorías de cada tipo de entrada
  const breakfastCalories = getCaloriesFromInputs(document.querySelectorAll('#breakfast input[type="number"]'));
  const lunchCalories = getCaloriesFromInputs(document.querySelectorAll('#lunch input[type="number"]'));
  const dinnerCalories = getCaloriesFromInputs(document.querySelectorAll('#dinner input[type="number"]'));
  const snacksCalories = getCaloriesFromInputs(document.querySelectorAll('#snacks input[type="number"]'));
  const exerciseCalories = getCaloriesFromInputs(document.querySelectorAll('#exercise input[type="number"]'));
  const budgetCalories = Number(budgetNumberInput.value); // Obtiene el presupuesto de calorías

  if (isError) return; // Si hay un error, sale de la función

  // Calcula las calorías consumidas y restantes
  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? 'Superávit' : 'Déficit'; // Determina si hay superávit o déficit

  // Muestra los resultados en el contenedor de salida
  output.innerHTML = `
    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remaining
