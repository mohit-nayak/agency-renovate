import React, {useState} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import AppButton from "../AppButton/AppButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import FileUploader from 'react-firebase-file-uploader';
import {storage} from "../../config/firebase";
import styles from './ImageUploader.module.scss';

const ImageUploader = (
    {
        name = 'preview',
        required = false,
        randomizeFileName = true,
        onUploadSuccess = () => {},
        onUploadReset = () => {},
        storageRef = ''
    }
) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const showUploader = !uploading && !imageUrl;
    const showLoading = uploading || ( imageUrl && !imageLoaded );

    const uploadSuccessHandler = filename => {
        storage()
            .ref(storageRef)
            .child(filename)
            .getDownloadURL()
            .then(downloadUrl => {
                setImageUrl(downloadUrl);
                setUploading(false);
                onUploadSuccess(filename, downloadUrl);
            });
    };

    const uploadErrorHandler = error => {
        console.log("error", error)
    };

    const onImageLoaded = () => {
        setImageLoaded(true);
        setUploading(false);
    };

    const resetImageHandler = () => {
        setUploadProgress(0);
        setImageUrl(null);
        setImageLoaded(false);
        onUploadReset();
    };

    return (
        <div className={styles.Wrapper}>
            { !imageUrl && <>
                <label className={showUploader ? '' : 'd-none'}>Select preview</label>
                <FileUploader accept="image/*"
                              required={required}
                              className={[styles.Uploader, showUploader ? '' : styles.Hide].join(' ')}
                              name="project-preview"
                              randomizeFilename={randomizeFileName}
                              storageRef={storage().ref(storageRef)}
                              onUploadStart={() => setUploading(true)}
                              onUploadError={uploadErrorHandler}
                              onUploadSuccess={uploadSuccessHandler}
                              onProgress={value => setUploadProgress(value)}
                />
            </> }

            <div className={styles.PreviewWrapper} onClick={resetImageHandler}>
                { showLoading && (
                    <>
                        <Spinner animation="border" variant="primary" className={styles.Loading} />
                        <p className='m-0 text-center'>{ `${uploadProgress}%` }</p>
                    </>
                )}

                { imageUrl && <img src={imageUrl} alt="Preview" className={styles.Preview} onLoad={onImageLoaded} /> }
                { imageLoaded ? <AppButton variant="link" classes={[styles.ChangeBtn]}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </AppButton> : null }
            </div>

        </div>
    );
};

export default ImageUploader;
