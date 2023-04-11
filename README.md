# Draw2gether

Simple online drawing app. You can draw with your friends in real time. You can create new layers and change background color. You can also erase your drawing.

To run this app you need to download both repositories, this one and **[Backend repository](https://github.com/RadekPelikan/year_project-Socket.io-server)**

**You can see PDF document with more information about project in docs folder.**

- [PDF document](./docs/Documentation%20CZECH.pdf)
- [Powerpoint presentation](./docs/Presentation%20CZECH.pptx)

![Title image](./docs/img/title%20image.png)

## Keyboard shortcuts

Inside room press `F1` see keyboard shortcuts

| Shortcut | Action                  |
| -------- | ----------------------- |
| `P`      | Brush                   |
| `E`      | Eraser                  |
| `+ -`    | Brush size              |
| `N`      | New layer               |
| `R`      | Remove last layer       |
| `C`      | Change background color |

## How to run

- `mkdir drawApp`
- `cd drawApp`
- `git clone https://github.com/RadekPelikan/year_project-Socket.io-server backend`
- `git clone https://github.com/RadekPelikan/year_project-Socket.io-client client`

Open two terminals

- `cd backend`
- `npm install`
- `npm start`

Second terminal

- `cd client`
- `npm install`
- `npm start`
