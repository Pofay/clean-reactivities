import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';

interface Props {
  setFiles: (files: any) => void;
}

function PhotoWidgetDropzone(props: Props) {
  const { setFiles } = props;
  const dropzoneStyles = {
    border: 'dashed 3px #eee',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center' as 'center',
    height: 200,
  };

  const dropzoneActive = {
    borderColor: 'green',
  };

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const urls = acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      console.table(urls)
      setFiles(urls);
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive ? { ...dropzoneStyles, ...dropzoneActive } : dropzoneStyles
      }
    >
      <input {...getInputProps()} />
      <Icon name='upload' size='huge' />
      <Header content='Drop image here' />
    </div>
  );
}

export default PhotoWidgetDropzone;
