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
  const [oldBlobs, setOldBlobs] = useState<Blob[]>([]);
  const [geneOrganisms, setGeneOrganisms] = useState<string[]>(['all']);
  const [tabValue, setTabValue] = React.useState(0);



  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleImageCrop = () => {
    if (cropper) {
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

  const startAnalysis = () => {
    /*     serviceInstance.setCroppedImages(croppedImages);
        serviceInstance.setAreaSetting('analyzing'); */
  }

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


  const recropImages = async () => {
    if (cropper) {
      const copyCroppedImages = [...croppedImages];
      for await (const croppedImage of copyCroppedImages) {
        const widthFactor = cropper.getCanvasData().naturalWidth / croppedImage.cropBoxData.imageWidth;
        const heightFactor = cropper.getCanvasData().naturalHeight / croppedImage.cropBoxData.imageHeight;
        cropper.enable();
        cropper.setCropBoxData({
          height: croppedImage.cropBoxData.height * heightFactor,
          width: croppedImage.cropBoxData.width * widthFactor,
          top: croppedImage.cropBoxData.top * heightFactor,
          left: croppedImage.cropBoxData.left * widthFactor
        });
        const img = cropper.getCroppedCanvas().toDataURL();
        const blob = await new Promise<Blob>((resolve, reject) => {
          cropper.getCroppedCanvas().toBlob((blobValue: Blob | null) => {
            if (blobValue) {
              resolve(blobValue);
            } else {
              reject(null);
            }
          });
        });
        croppedImage.dataUrl = img;
        croppedImage.blob = blob;
      }
      cropper.setCropBoxData({
        height: cropper.getCanvasData().height,
        left: cropper.getCanvasData().left,
        top: cropper.getCanvasData().top,
        width: cropper.getCanvasData().width
      });
      cropper.disable();
      setCroppedImages(copyCroppedImages);
    }
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


  console.log(progressAndData.text.previewString, progressAndData)
  /* 
    useEffect(() => {
      const subscription = serviceInstance.getRawImage.subscribe(setRawImage);
      getGeneOrganismsRequest().then((value: string[]) => {
        setGeneOrganisms(value);
      })
      return () => subscription.unsubscribe();
    }, [serviceInstance]); */

  useEffect(() => {
    if (progressAndData.text.previewString) {
      setRaw(String(progressAndData.text?.previewString));
      console.log('setting value')
    }

  }, [progressAndData.text.previewString]);

  return (
    <div>
      {raw && (
        <div style={{marginTop: '30px'}}>
          <div style={{marginBottom: '10px'}}>
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
            <Cropper style={{ width: "800px", height: "500px" }} zoomTo={0.5} initialAspectRatio={1}
              src={raw} viewMode={1} minCropBoxHeight={10} minCropBoxWidth={10}
              background={false} responsive={true} autoCropArea={1} checkOrientation={false}
              onInitialized={(instance) => setCropper(instance)} guides={true} />
          </div>
          <div>
            <Button onClick={handleImageCrop}>Crop image</Button>
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
                                <FormControl sx={{ m: 1, whiteSpace: "nowrap" }} size="small">
                                  <InputLabel id="select-word-type">Type</InputLabel>
                                  <Select value={imageItem.type} onChange={(e) => changeCroppedImageAttribute('type', e.target.value, i)}
                                    labelId="select-word-type" label="Type">
                                    <MenuItem value="gene">Gene</MenuItem>
                                    <MenuItem value="text">Free text</MenuItem>
                                  </Select>
                                </FormControl>
                                {imageItem.type === 'gene' && (
                                  <FormControl sx={{ m: 1, whiteSpace: "nowrap" }} size="small">
                                    <InputLabel id="select-gene-type">Gene organism</InputLabel>
                                    <Select value={imageItem?.geneType} onChange={(e) => changeCroppedImageAttribute('geneType', e.target.value, i)}
                                      labelId="select-gene-type" label="Type">
                                      {geneOrganisms.map((geneOrganism, geneOrganismIndex) => (
                                        <MenuItem key={`${geneOrganism}-${geneOrganismIndex}`} value={geneOrganism}>{geneOrganism}</MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                )}
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

                  <div className={-1 === editingExisting && cropperEdit ? 'mt-3 border border-4 border-solid border-sky-600 rounded-md' : ''}>
                    <div className="flex flex-row items-center">
                      <IconButton onClick={createNewCrop} aria-label="delete" size="large">
                        <AddIcon />
                      </IconButton>
                      <p>Create new crop image</p>
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
          {/* <div style={{ display: "flex", flexDirection: "column" }} >
            <div className="flex flex-row">
              <div>
                
                <Cropper style={{ width: "1000px", height: "1000px", maxHeight: "100%", maxWidth: "100%" }} zoomTo={0.5} initialAspectRatio={1}
                  src={String(progressAndData[fileType].previewString)} viewMode={1} minCropBoxHeight={10} minCropBoxWidth={10}
                  background={false} responsive={true} autoCropArea={1} checkOrientation={false}
                  onInitialized={(instance) => setCropper(instance)} guides={true} />

                <div className="mt-3 flex flex-row-reverse">
                  <button onClick={handleImageCrop}>Crop image</button>
                </div>
              </div>
              <div className="ml-3 w-full">
                
              </div>
            </div>
            <div className="mt-5 w-full flex justify-end">
              <button type="button" onClick={startAnalysis} disabled={croppedImages.length === 0} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                {true ? 'Start analysis' : 'Start analysis again'}
              </button>
            </div>
          </div> */}
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