import React, { useState, useContext } from "react";
import { ProgressAndDataModel } from "./text-home.component";
import { Button } from "@mui/material";

interface Props {
  progressAndData: ProgressAndDataModel;
  setProgressAndData: React.Dispatch<React.SetStateAction<ProgressAndDataModel>>;
  fileType: 'text' | 'image'
}


export const TextFileUploadComponent: React.FC<Props> = ({ progressAndData, setProgressAndData, fileType }): React.ReactElement => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    if (event.target.files || event.target.files.length !== 0) {
      const objectUrl = URL.createObjectURL(event.target.files[0]);
      setPreview(objectUrl);
    }
  };

  const handleSubmission = () => {
    if (preview) {
      setProgressAndData({ ...progressAndData, [fileType]: { ...progressAndData[fileType], previewString: preview, progress: 1 } });
    }
  };

  return (
    <div className="mt-5">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Upload new image
      </label>
      <Button
        component="label"
        variant="outlined"
      >
        Upload File
        <input
          onChange={changeHandler}
          type="file"
          hidden
          accept=".jpg,.jpeg,.png"
        />
      </Button>
      {selectedFile && (
        <div className="flex flex-col items-center">
          <div className="">
            <img src={preview} style={{ maxHeight: "80%", maxWidth: "80%" }}
              className="my-5 border border-gray-400 rounded-lg" alt="preview of uploaded file" />
            <div className="flex flex-row-reverse">
              <Button type="button" onClick={handleSubmission} variant="outlined">
                Use image
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
