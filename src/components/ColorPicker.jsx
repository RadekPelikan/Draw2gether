import React, { useState } from "react";
import { ChromePicker as ColPicker } from "react-color";

const ColorPicker = ({ color, setColor, handleChangeBg }) => {
  return (
    <ColPicker
      color={color}
      onChange={(color) => setColor(color.rgb)}
      onChangeComplete={handleChangeBg}
    />
  );
};

// const ColorPicker = ({ color, setColor, handleChangeBg }) => {
// const [displayCP, setDisplayCP] = useState(false);

//   const popover = {
//     position: 'absolute',
//     zIndex: '2',
//   }
//   const cover = {
//     position: 'fixed',
//     top: '0px',
//     right: '0px',
//     bottom: '0px',
//     left: '0px',
//   }

//   return (
//     <div>
//       <button onClick={() => setDisplayCP(!displayCP)}>Pick Color</button>
//       {displayCP ? (
//         <div>
//           <div onClick={() => setDisplayCP(false)} />
//           <ColPicker
//             color={color}
//             onChange={(color) => setColor(color.rgb)}
//             onChangeComplete={handleChangeBg}
//           />
//         </div>
//       ) : null}
//     </div>
//   );
// };

export default ColorPicker;
