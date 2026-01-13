import fs from "fs/promises";
import ch from "chalk";

async function readTasks(FILE_NAME) {
  try {
    const data = await fs.readFile(FILE_NAME, "utf-8");

    if (!data) {
      console.log(ch.yellow("No hay tareas registradas."));
      return;
    }

    const tasks = data.split(/\r?\n/);

    console.log(ch.green("Tareas registradas:"));
    tasks.forEach((task, index) => {
      if (task.trim() !== "") {
        console.log(ch.cyanBright(`${index + 1}. ${task}`));
      }
    });
  } catch (error) {
    console.error(ch.red("Error al leer el archivo de tareas"));
  }
}

export default readTasks;
