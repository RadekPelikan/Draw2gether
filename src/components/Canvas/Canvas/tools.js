const drawLine = ({ p5, x, y, pX, pY, size }) => {
  p5.strokeWeight(size);
  p5.line(x, y, pX, pY);
};

const dfs = (grid, x, y, oldColor, newColor) => {
  const w = grid[0].length;
  const h = grid.length;
  if (
    x < 0 ||
    x >= w ||
    y < 0 ||
    y >= h ||
    grid[y][x].join("") != oldColor.join("")
  )
    return;
  grid[y][x] = newColor;
  dfs(grid, x + 1, y, oldColor, newColor);
  dfs(grid, x - 1, y, oldColor, newColor);
  dfs(grid, x, y + 1, oldColor, newColor);
  dfs(grid, x, y - 1, oldColor, newColor);
};

export const ToolsIcons = {
  pencil: "fa-paintbrush",
  eraser: "fa-eraser",
  // bucket: "fa-fill-drip",
  // line: "fa-grip-lines",
  // rectangle: "fa-square",
  // circle: "fa-circle"
};

const Tools = {
  pencil(data) {
    const { p5, color } = data;
    p5.noErase();
    p5.stroke(color);
    drawLine(data);
  },

  eraser(data) {
    const { p5 } = data;
    p5.erase();
    drawLine(data);
  },

  bucket({ p5, canvSize: { width, height }, x, y, color }) {
    p5.loadPixels();
    const grid = [];
    const pixels = [...p5.pixels];
    const N = pixels.length / (width * height);
    for (let i = 0; i < pixels.length; i += 4 * N * width) {
      const row = []
      for (let j = i; j < (i + width) * N; j += 4 * N) {
        row.push(pixels.slice(j, j + 4));
      }
      grid.push(row)
    }
    x = Math.floor(x)
    y = Math.floor(y)
    console.log(grid)
    // console.log(grid[y][x])
    // dfs(grid, x, y, grid[y][x], color);
    // console.log(grid[y][x])
  },
};

export default Tools;
