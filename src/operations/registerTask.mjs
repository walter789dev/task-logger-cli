import fs from "fs/promises";
import ch from "chalk";
import { getcurrentTimestamp } from "../utils.mjs";

async function registerTask(rl, FILE_NAME) {
  let taskDetails = await rl.question(
    "Ingrese los detalles de la tarea a registrar:\n"
  );
  if (!validateRegisterTask(taskDetails)) {
    console.log(
      ch.yellow(
        "La tarea debe tener al menos 10 caracteres y no ser un número. \n"
      )
    );
    return registerTask(rl);
  }

  const timestamp = getcurrentTimestamp();
  taskDetails += ` - ${timestamp}`;

  await fs.appendFile(FILE_NAME, taskDetails + "\n");
}

function validateRegisterTask(task) {
  if (task.trim() === "") return false;
  if (task.length < 10) return false;
  if (!isNaN(task)) return false;
  return true;
}

export default registerTask;
