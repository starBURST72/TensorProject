import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Image, Upload, message } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type SettingsInputProps = {
    ava: string | null | undefined;
    key: string;
    name: string;
    id: string;
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
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

    useEffect(() => {
        if (ava) {
            setFileList([{ uid: '0', name: 'ava.jpg', status: 'done', url: ava }]);
        }
    }, [ava]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList }) => {
        setFileList(fileList);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <Form.Item key={key} name={name} id={id}>
            <Upload
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    width={'100%'}
                    height={'100%'}
                    style={{ objectFit: 'cover' }}
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
