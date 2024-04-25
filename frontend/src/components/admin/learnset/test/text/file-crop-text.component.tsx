/* import React, { useState, useEffect } from "react";

import Cropper from "react-cropper";
import { Button } from "@mui/material";


import { ProgressAndDataModel } from "./text-home.component";


interface Props {
  progressAndData: ProgressAndDataModel;
  setProgressAndData: React.Dispatch<React.SetStateAction<ProgressAndDataModel>>;
}


export const FileCropTextComponent: React.FC<Props> = ({ progressAndData, setProgressAndData }) => {
  const [raw, setRaw] = useState<string | undefined>();
  const [cropper, setCropper] = useState<Cropper>();


  const handleImageCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blobValue: Blob | null) => {
        const img = cropper.getCroppedCanvas().toDataURL();
        console.log(blobValue);
        setProgressAndData({ ...progressAndData, progress: 2, blob: blobValue, croppedImg: img });
      });
    } else {
      console.error("Cropper is not defined!");
    }
  };

  useEffect(() => {
    if (progressAndData.previewString) {
      setRaw(String(progressAndData?.previewString));
    }
  }, [progressAndData.previewString]);

  return (
    <div>
      {raw && (
        <div style={{ marginTop: '30px' }}>
          <div style={{ marginBottom: '10px' }}>
            <div>
              <Cropper style={{ width: "auto", height: "auto" }} zoomTo={0.5} initialAspectRatio={1}
                src={raw} viewMode={1} minCropBoxHeight={10} minCropBoxWidth={10}
                background={false} responsive={true} autoCropArea={1} checkOrientation={false}
                onInitialized={(instance) => setCropper(instance)} guides={true} />
            </div>
            <div>
              <Button onClick={handleImageCrop} variant="outlined">Crop image</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 */
const test = {}
export default test;