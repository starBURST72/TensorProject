import React, { useState, useEffect } from 'react';
import { Upload, Modal, message, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload/interface';

type SettingsAvatarInputProps = {
  file: string | null; // file is now a base64 string or null
  key: string;
  name: string;
  id: string;
  onAvatarLoad: () => void;
  onFileChange: (file: File | null) => void;
};

const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

const SettingsAvatarInput: React.FC<SettingsAvatarInputProps> = ({
  file,
  key,
  name,
  id,
  onAvatarLoad,
  onFileChange,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);


  useEffect(() => {
    if (file) {
      const uploadFile: UploadFile = {
        uid: '-1',
        name: 'avatar',
        status: 'done',
        url: file,
      };
      setFileList([uploadFile]);
      onAvatarLoad();
    }
  }, [file, onAvatarLoad]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };


  const handleChange: UploadProps['onChange'] = async ({ file, fileList }) => {
    setFileList(fileList);
    if (file.status === 'done' || file.status === 'uploading') {
      if (file.originFileObj) {
        const base64 = await getBase64(file.originFileObj as File);
        onFileChange(file.originFileObj as File);
        setPreviewImage(base64);
        onAvatarLoad();
      }
    } else if (file.status === 'removed') {
      onFileChange(null);
      setPreviewImage('');
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  return (
    <Form.Item key={key} name={name} id={id}>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={(file) => {
          const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
          if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
          }
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            message.error('Image must be smaller than 2MB!');
          }
          return isJpgOrPng && isLt2M;
        }}
        maxCount={1}
      >
        {fileList.length === 0 && uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Form.Item>
  );

};

export default SettingsAvatarInput;
