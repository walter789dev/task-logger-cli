import ch from "chalk";
import readline from "readline/promises";
import selectOption from "./selectOption.mjs";
import registerTask from "./operations/registerTask.mjs";
import readTasks from "./operations/readTasks.mjs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const FILE_NAME = "log_tareas.txt";
const log = console.log;

const optionsMenu = [
  "Registrar tarea",
  "Eliminar tarea",
  "Actualizar tarea",
  "Ver tareas registradas",
  "Salir",
];

log(ch.green("--- Bienvenido al registrador de tareas ---"));

async function main() {
  log(ch.blue("> ¿Que deseas hacer hoy?"));
  const selectedOption = await selectOption(rl, optionsMenu);

  if (!selectedOption) {
    log(ch.red("x Por favor ingresa una opción válida."));
    return main();
  }

  log(`\n> Opción seleccionada: ${ch.blue(optionsMenu[selectedOption - 1])}\n`);

  switch (selectedOption) {
    case 1:
      await registerTask(rl, FILE_NAME);
      log(ch.green("> Tarea registrada exitosamente."));
      break;
    case 2:
      log("Eliminar tarea");
      break;
    case 3:
      log("Actualizar tarea");
      break;
    case 4:
      await readTasks(FILE_NAME);
      break;
    case 5:
      log(ch.red("> Saliendo del programa..."));
      rl.close();
      return;
  }

  const option = await askForAnotherOperation(rl);
  if (option === "s") {
    main();
  } else {
    log(ch.red("> Saliendo del programa..."));
    rl.close();
  }
}

main();

function askForAnotherOperation(rl) {
  return rl.question(ch.blue("\n¿Deseas realizar otra operación? (s/n): "));
}
