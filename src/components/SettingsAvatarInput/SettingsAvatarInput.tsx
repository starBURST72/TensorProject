import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Image, Upload, message } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type SettingsInputProps = {
    ava: string
    key: string
    name: string
    id: string
    onAvatarLoad: () => void;
};

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const SettingsAvatarInput: React.FC<SettingsInputProps> = ({ ava, key, name, id, onAvatarLoad }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [file, setFile] = useState<UploadFile<any> | null>(() => {
        const file = {
            uid: '',
            name: '',

        };
        return file;
    });

    useEffect(() => {
        if (ava) {
            setFile({ uid: '0', name: 'ava.jpg', status: 'done', url: ava });
        }
      }, [ava]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ file }) => {
        if (file.status === 'done') {
            setFile(file);
        } else if (file.status === 'removed') {
            setFile(null);
        } else if (file.status === 'uploading') {
            // Add this condition to update the file state while uploading
            setFile(() => file);
        }
        console.log(file)
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (

        <Form.Item
            key={key}
            name={name}
            id={id}


        >


            <Upload
                // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-circle"
                fileList={file ? [file] : []}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {file ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image

                    width={'100%'} // Установите желаемую ширину изображения
                    height={'100%'} // Установите желаемую высоту изображения
                    style={{ objectFit: 'cover' }} // Добавьте этот стиль для предотвращения обрезания изображения
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </Form.Item>
    );
};

export default SettingsAvatarInput;