import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import ImageUploader from "../ImageUploader/ImageUploader";
import AppModal from "../AppModal/AppModal";
import Input from "../Input/Input";
import AppButton from "../AppButton/AppButton";
import styles from './CreateUpdateProjectModal.module.scss';
import {storage} from "../../config/firebase";

const CreateUpdateProjectModal = ({ show, onHide, data, onImageChanged, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [previewFileName, setPreviewFileName] = useState("");
    const [previewDownloadUrl, setPreviewDownloadUrl] = useState("");
    const [budget, setBudget] = useState("");
    const [completionTime, setCompletionTime] = useState("");
    const [validated, setValidated] = useState(null);

    const onUploadSuccess = (filename, downloadUrl) => {
        setPreviewFileName(filename);
        setPreviewDownloadUrl(downloadUrl);
        onImageChanged(filename, downloadUrl);
    };

    // On reset the uploaded image.
    const onUploadReset = () => {
        setPreviewFileName("");
        setPreviewDownloadUrl("");
    };

    // Validate data and send to submission function.
    const submitHandler = e => {
        e.preventDefault();

        const validation = !!(
            previewFileName.trim() &&
            previewDownloadUrl.trim() &&
            title.trim() &&
            desc.trim() &&
            budget.trim() &&
            completionTime.trim()
        );

         const data = {
             previewFileName,
             previewDownloadUrl,
             title,
             desc,
             budget,
             completionTime,
         };

         if (validation) {
             onSubmit(data);
             resetForm();
         }
         setValidated(validation);
    };

    // Reset form values.
    const resetForm = () => {
        setPreviewFileName("");
        setPreviewDownloadUrl("");
        setTitle("");
        setDesc("");
        setBudget("");
        setCompletionTime("");
        setValidated(null);
    };

    const deletePreview = async filename => {
        await storage().ref("project-previews").child(filename).delete();
    };

    const discardUploadedImage = () => {
        deletePreview(previewFileName).then(res => res);
    };

    // Hide modal. Check and delete uploaded image if new project creation attempted and discarded.
    const hideModalHandler = () => {
        if (!data && previewFileName && previewDownloadUrl) {
            discardUploadedImage();
        }

        resetForm();
        onHide();
    };

    useEffect(() => {
        // Reset the validation on change in any field.
        setValidated(null);
    }, [previewFileName, previewDownloadUrl, title, desc, budget, completionTime]);

    useEffect(() => {
        // If attempt to edit existing project, populate the data in the form.
        if (data) {
            setPreviewFileName(data.previewFileName);
            setPreviewDownloadUrl(data.previewDownloadUrl);
            setTitle(data.title);
            setDesc(data.desc);
            setBudget(data.budget);
            setCompletionTime(data.completionTime);
        }
    }, [data]);

    return (
        <AppModal show={show} onHide={hideModalHandler}>
            <Form className="py-2">
                <ImageUploader required={true}
                               existingFileName={previewFileName}
                               existingFileUrl={previewDownloadUrl}
                               onUploadSuccess={onUploadSuccess}
                               onUploadReset={onUploadReset}
                               deleteFile={deletePreview}
                               storageRef="project-previews"
                               randomizeFileName={true}
                />

                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Input type="text" value={title} onChange={setTitle} placeholder="E.g. Interior Design Renovation" required={true} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Input type="text" as="textarea" value={desc} onChange={setDesc} placeholder="Description" classes={[styles.Desc]} required={true} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Budget</Form.Label>
                    <Input type="text" value={budget} onChange={setBudget} placeholder="From E.g. $10K to $20K" required={true} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Completion time</Form.Label>
                    <Input type="text" value={completionTime} onChange={setCompletionTime} placeholder="E.g. 3 weeks to 1 month" required={true} />
                </Form.Group>

                <Form.Group className="mt-3 mb-0">
                    { (!validated && validated !== null) && <label className="text-danger">One or more fields are not filled correctly.</label> }

                    <AppButton type="submit"
                               classes={[styles.SubmitBtn]}
                               onClick={submitHandler}
                               disabled={!previewDownloadUrl}>
                        Add Project
                    </AppButton>
                </Form.Group>
            </Form>
        </AppModal>
    );
};

export default CreateUpdateProjectModal;
