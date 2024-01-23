import React, { useState, useContext, useEffect, useRef } from "react";

import Cropper from "react-cropper";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import Paper from "@mui/material/Paper";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { ProgressAndDataModel } from "./home.component";
import axios from "axios";


interface Props {
  progressAndData: ProgressAndDataModel;
  setProgressAndData: React.Dispatch<React.SetStateAction<ProgressAndDataModel>>;
}


export const FileCropTextComponent: React.FC<Props> = ({ progressAndData, setProgressAndData }) => {
  const [raw, setRaw] = useState<string | undefined>();
  const [cropper, setCropper] = useState<Cropper>();
  const [croppedImages, setCroppedImages] = useState<CroppedImageModel[]>([])
  const [editingExisting, setEditingExisting] = useState<number>(-1);
  const [cropperEdit, setCropperEdit] = useState<boolean>(true);


  const handleImageCrop = () => {
    if (cropper && cropperEdit) {
      cropper.getCroppedCanvas().toBlob((blobValue: Blob | null) => {
        if (blobValue) {
          const img = cropper.getCroppedCanvas().toDataURL();
          const copyCroppedImages = [...croppedImages];
          if (editingExisting === -1) {
            copyCroppedImages.push({
              blob: blobValue,
              title: `crop ${copyCroppedImages.length + 1}`,
              type: 'gene',
              geneType: 'all',
              dataUrl: img,
              status: 'cropped',
              cropBoxData: {
                left: cropper.getCropBoxData().left,
                top: cropper.getCropBoxData().top,
                width: cropper.getCropBoxData().width,
                height: cropper.getCropBoxData().height,
                imageHeight: cropper.getCanvasData().naturalHeight,
                imageWidth: cropper.getCanvasData().naturalWidth
              }
            });
          } else {
            copyCroppedImages[editingExisting].blob = blobValue;
            copyCroppedImages[editingExisting].dataUrl = img;
            copyCroppedImages[editingExisting].cropBoxData = {
              left: cropper.getCropBoxData().left,
              top: cropper.getCropBoxData().top,
              width: cropper.getCropBoxData().width,
              height: cropper.getCropBoxData().height,
              imageHeight: cropper.getCanvasData().naturalHeight,
              imageWidth: cropper.getCanvasData().naturalWidth
            }
            setEditingExisting(-1);
          }

          setCroppedImages(copyCroppedImages);

          cropper.setCropBoxData({
            height: cropper.getCanvasData().height,
            left: cropper.getCanvasData().left,
            top: cropper.getCanvasData().top,
            width: cropper.getCanvasData().width
          });
        }
        setCropperEditMode(false);
      });
    } else {
      console.error("Cropper is not defined!");
    }
  };

  const setCropperEditMode = (value: boolean) => {
    setCropperEdit(value);
    if (value) {
      cropper?.enable();
    } else {
      cropper?.disable();
    }
  }

  const changeCroppedImageAttribute = (attribute: 'title' | 'type' | 'geneType', value: string, index: number) => {
    const copyCroppedImages = [...croppedImages];
    copyCroppedImages[index][attribute] = value;
    setCroppedImages(copyCroppedImages);
  }

  const deleteCroppedImage = (index: number) => {
    const copyCroppedImages = [...croppedImages];
    copyCroppedImages.splice(index, 1);
    setCroppedImages(copyCroppedImages);
  }

  const handleSetCrop = (data: CroppedImageModel, index: number) => {
    if (cropper) {
      setCropperEditMode(true);
      cropper.setCropBoxData(data.cropBoxData);
      setEditingExisting(index);
    }
  }

  const createNewCrop = () => {
    if (cropper) {
      setCropperEditMode(true);
      cropper.setCropBoxData({
        height: cropper.getCanvasData().height,
        left: cropper.getCanvasData().left,
        top: cropper.getCanvasData().top,
        width: cropper.getCanvasData().width
      });
      setEditingExisting(-1);
    }
  }

  const startAnalysis = () => {
    croppedImages.forEach(x => {
      analyzeBlobItem(x.blob).then(x => {
        console.log(x);
      })
    })
  }

  const analyzeBlobItem = (item: Blob): Promise<any> => {
    const formData = new FormData();
    var file = new File([item], "image.png", {
      lastModified: new Date().getTime(),
      type: item.type,
    });
    formData.append('file', file)
    const requestOptions = {
        method: 'POST',
        body: formData
    };
    return fetch(`http://localhost:3001/analysis/image`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
  }

  useEffect(() => {
    if (progressAndData.text.previewString) {
      setRaw(String(progressAndData.text?.previewString));
    }
  }, [progressAndData.text.previewString]);

  return (
    <div>
      {raw && (
        <div style={{ marginTop: '30px' }}>
          <div style={{ marginBottom: '10px' }}>
            {cropperEdit && (
              <div>
                <CheckIcon />
                Edit is enabled
              </div>
            )}
            {!cropperEdit && (
              <div>
                <CloseIcon />
                Edit is disabled
              </div>
            )}

          </div>
          <div>
            <Cropper style={{ width: "auto", height: "500px" }} zoomTo={0.5} initialAspectRatio={1}
              src={raw} viewMode={1} minCropBoxHeight={10} minCropBoxWidth={10}
              background={false} responsive={true} autoCropArea={1} checkOrientation={false}
              onInitialized={(instance) => setCropper(instance)} guides={true} />
          </div>
          <div>
            <Button onClick={handleImageCrop} disabled={!cropperEdit} variant="outlined">Crop image</Button>
            <div>
              {croppedImages.length !== 0 && (
                <div>
                  <Box sx={{ width: '100%' }}>
                    <TableContainer component={Paper} className="overflow-y-auto" style={{ maxHeight: '500px' }}>
                      <Table sx={{ width: '100%' }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {croppedImages.map((imageItem, i) => (
                            <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }}
                              className={i === editingExisting ? 'border border-4 border-solid border-sky-600 rounded-md' : ''} >
                              <TableCell component="th" scope="row">
                                <TextField id="outlined-size-small" value={imageItem.title} size="small"
                                  onChange={(e) => changeCroppedImageAttribute('title', e.target.value, i)}
                                  fullWidth style={{ minWidth: 100, }} />
                              </TableCell>
                              <TableCell align="right">
                                <img src={imageItem.dataUrl} style={{ maxHeight: "200px", maxWidth: "200px" }} />
                              </TableCell>
                              <TableCell align="right">
                                <FormControl sx={{ m: 1, whiteSpace: "nowrap" }} size="small" style={{ width: "100%" }}>
                                  <InputLabel id="select-word-type">Type</InputLabel>
                                  <Select value={imageItem.type} onChange={(e) => changeCroppedImageAttribute('type', e.target.value, i)}
                                    labelId="select-word-type" label="Type">
                                    <MenuItem value="noun">noun</MenuItem>
                                    <MenuItem value="verb">verb</MenuItem>
                                    <MenuItem value="verb">adjectives</MenuItem>
                                  </Select>
                                </FormControl>
                              </TableCell>
                              <TableCell align="right">
                                <IconButton onClick={() => { handleSetCrop(imageItem, i) }} aria-label="delete" size="large">
                                  <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => { deleteCroppedImage(i) }} aria-label="delete" size="large">
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>

                  <div>
                    <div>
                      <IconButton onClick={createNewCrop} aria-label="delete" size="large">
                        <p>Add new crop</p>
                        <AddIcon />
                      </IconButton>

                    </div>
                  </div>
                </div>
              )}
              {croppedImages.length === 0 && (
                <div className="w-full flex flex-col items-center mt-6">
                  <p>No image cropped yet, crop your first image!</p>
                </div>
              )}
            </div>
          </div>
          <Button variant="contained" onClick={startAnalysis}>
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}


export interface CroppedImageModel {
  blob: Blob;
  title: string;
  type: string;
  geneType: string;
  dataUrl: string;
  status: 'cropped' | 'analyzing' | 'wordspelling' | 'analyzed';
  cropBoxData: {
    left: number;
    top: number;
    width: number;
    height: number;
    imageHeight: number;
    imageWidth: number;
  };
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}