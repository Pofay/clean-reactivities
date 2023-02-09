import PhotoWidgetDropzone from 'App/common/imageUpload/PhotoWidgetDropzone';
import { useEffect, useState } from 'react';
import { Button, Grid, Header, Image } from 'semantic-ui-react';
import { Cropper } from 'react-cropper';
import PhotoImageCropper from 'App/common/imageUpload/PhotoImageCropper';

interface Props {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
}

const cleanUpFileUrl = (file: any) => URL.revokeObjectURL(file.preview);

function PhotoUploadWidget(props: Props) {
  const { loading, uploadPhoto } = props;
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  };

  useEffect(() => {
    return () => {
      files.forEach(cleanUpFileUrl);
    };
  }, [files]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 1 - Add Photo' />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 2 - Resize Image' />
        {files && files.length > 0 && (
          <PhotoImageCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 3 - Preview and Upload' />
        {files && files.length > 0 && (
          <>
            <div
              className='img-preview'
              style={{ minHeight: 200, overflow: 'hidden' }}
            />
            <Button.Group widths={2}>
              <Button
                loading={loading}
                onClick={onCrop}
                positive
                icon='check'
              />
              <Button
                disabled={loading}
                onClick={() => setFiles([])}
                icon='close'
              />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}

export default PhotoUploadWidget;
