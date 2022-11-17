import React, { useState } from "react";
//import AddPhoto from "../gcp/AddPhoto"; //esto rompe todo
const { Button } = require("@mui/material");

//meti esto aca para probar xD como ya estaba la ruta...
export default function PageProfile() {
  const [image, setImage] = useState([]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = {
        preview: URL.createObjectURL(event.target.files[0]),
        data: event.target.files[0],
      };
      setImage(file);
    }
  };

  return (
    <>
      <Button variant="contained" component="label">
        Upload
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={async (e) => {
            onImageChange(e);
            // const auth = await authorize();
            // addPhoto(auth, image);
          }}
        />
      </Button>
      {console.log(image)}
      <img src={image.preview} />
    </>
  );
}
