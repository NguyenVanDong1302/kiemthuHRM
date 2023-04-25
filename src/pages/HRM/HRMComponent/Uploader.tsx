import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import store from 'store/store';
import { Avatar, Button, Message, Uploader, toaster } from 'rsuite'
import { useDispatch } from 'react-redux';
import { setListDataUpload } from 'store/reducers/selectApi';
import { Icon } from '@rsuite/icons';
import { AiOutlineCamera } from 'react-icons/ai';
import { BsUpload } from 'react-icons/bs';
import { renderFileUploading } from 'components/CustomModal/UpLoader';

function UploaderCp({ url, flag, uuid }: { url?: any, flag: any, uuid: any }) {
    const { NetworkId, OrgId } = store.getState().orgInfo
    const [fileInput, setFileInput] = useState();
    const [uploading, setUploading] = React.useState(false);
    const [fileInfo, setFileInfo] = React.useState<string>("");
    const [isUploadAvatar, setIsUploadAvatar] = useState(false);
    const token = useSelector((state: any) => state.auth.token);
    const [flagProps, setFlagProps] = useState<string>(flag);
    const listData = useSelector((state: any) => state.selectApiSlice.ListDataUpload);
    const dispatch = useDispatch();

    useEffect(() => {
        setFlagProps(flag);
    }, [uuid]);

    const headerTest = {
        NetworkId,
        OrgId,
        GwUserCode: "idocNet.idn.HRM.Sv",
        GwPassword: "idocNet.idn.HRM.Sv",
        UtcOffset: "7",
        AppAgent: "Web-HRM",
        AppLanguageCode: "en",
        AppVerCode: "V1",
        Tid: "2022.02.24.152050.000",
        Authorization: `Bearer ${token}`,
    };
    function previewFile(file: File, callback: (result: string | ArrayBuffer | null) => void) {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const handleRemoveFile = () => {
        dispatch(setListDataUpload({}))
    }

    const body = () => {
        if (flag == 'avatar') {
            return <div className='avatar__uploader' >
                {
                    fileInfo ? (
                        <Avatar
                            style={{ width: "200px", height: "200px" }}
                            className="mr-2 avatar-staff"
                            circle
                            size="lg"
                            src={fileInfo}
                        />
                    ) : (
                        <Avatar
                            style={{ width: "200px", height: "200px" }}
                            className="mr-2 avatar-staff"
                            circle
                            size="lg"
                            src={url}
                        />
                    )}
                <span> <Icon as={AiOutlineCamera} style={{ fontSize: '50px' }} /></span>
            </div >
        } else {
            return <div className='file__uploader' >
                {
                    listData.Url != null ? (
                        <>  {renderFileUploading(listData, <></>, 'create')}
                        </>
                    ) : (
                        <div className='button__uploadFile'
                            style={{
                                display: 'flex'
                            }}>
                            <p>Upload</p>
                            <span style={{ position: 'unset' }}><Icon as={BsUpload} style={{ fontSize: '50px', color: "black" }} /></span>

                        </div>
                    )
                }
            </div>
        }
    }
    return (
        <div
            style={{
                display: "flex"
            }}
        >
            <Uploader
                style={{ backgroundColor: "transparent" }}
                action={"//devapihrm.ecore.vn/File/UploadFile"}
                fileList={fileInput}
                name={"file"}
                method="POST"
                headers={headerTest}
                onUpload={(file: any) => {
                    previewFile(file.blobFile, (value: any) => {
                        setFileInfo(value);
                    });
                }}
                onSuccess={(response, file) => {
                    toaster.push(
                        <Message type="success">
                            Uploaded image successfully!!!
                        </Message>
                    );
                    dispatch(setListDataUpload(response.Data));
                }}
                onError={() => {
                    setFileInfo("");
                    toaster.push(
                        <Message type="error">Upload failed!!! Hihihi!!! </Message>
                    );
                }}
            >
                {body()}
            </Uploader>

            {
                listData.Url != null && <span onClick={handleRemoveFile}
                    style={{ cursor: 'pointer' }}
                >
                    X
                </span>
            }
        </div>

    )
}

export default UploaderCp

