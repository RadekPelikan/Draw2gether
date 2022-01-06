import { socket, curCanvas } from "./main.js";
import Tools from "./tools.js";

const tools = () => {
  for (const [key, value] of Object.entries(Tools.all)) {
    socket.on(`tool-${key}`, value.func);
  }
};

const canvas = () => {
  socket.on("canvas-changeBg", curCanvas.changeBgColorFromServer);
};

export const socketFn = [tools, canvas]
