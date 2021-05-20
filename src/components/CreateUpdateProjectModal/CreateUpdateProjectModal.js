import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageUploader from "../ImageUploader/ImageUploader";
import AppModal from "../AppModal/AppModal";
import Input from "../Input/Input";
import AppButton from "../AppButton/AppButton";
import styles from './CreateUpdateProjectModal.module.scss';

const CreateUpdateProjectModal = ({ show, onHide, randomizeFileName, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [previewFileName, setPreviewFileName] = useState("");
    const [previewDownloadUrl, setPreviewDownloadUrl] = useState("");
    const [lowestBudget, setLowestBudget] = useState("");
    const [highestBudget, setHighestBudget] = useState("");
    const [completionTime, setCompletionTime] = useState("");
    const [validated, setValidated] = useState(null);

    let highestBudgetDefault = "";
    if (lowestBudget) {
        highestBudgetDefault = parseInt(lowestBudget) + 1;
    }

    const onUploadSuccess = (filename, downloadUrl) => {
        setPreviewFileName(filename);
        setPreviewDownloadUrl(downloadUrl);
    };

    const onUploadReset = () => {
        setPreviewFileName("");
        setPreviewDownloadUrl("");
    };

    const submitHandler = e => {
        e.preventDefault();

        const validation = !!(
            previewFileName.trim() &&
            previewDownloadUrl.trim() &&
            title.trim() &&
            desc.trim() &&
            parseInt(lowestBudget.trim()) > 0 &&
            parseInt(highestBudget.trim()) &&
            completionTime.trim() &&
            parseInt(highestBudget.trim()) > parseInt(lowestBudget.trim())
        );

         const data = {
             previewFileName,
             previewDownloadUrl,
             title,
             desc,
             budget: `$${lowestBudget} - $${highestBudget}`,
             completionTime,
         };

         if (validation) {
             onSubmit(data);
             resetForm();
         }
    };

    const resetForm = () => {
        setPreviewFileName("");
        setPreviewDownloadUrl("");
        setTitle("");
        setDesc("");
        setLowestBudget("");
        setHighestBudget("");
        setCompletionTime("");
        setValidated(null);
    };

    const hideModalHandler = () => {
        resetForm();
        onHide();
    };

    useEffect(() => {
        setValidated(null);
    }, [previewFileName, previewDownloadUrl, title, desc, lowestBudget, highestBudget, completionTime]);

    return (
        <AppModal show={show} onHide={hideModalHandler}>
            <Form className="py-2">
                <ImageUploader name="preview"
                               required={true}
                               onUploadSuccess={onUploadSuccess}
                               onUploadReset={onUploadReset}
                               storageRef="project-previews"
                               randomizeFileName={randomizeFileName}
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
                    <Form.Label>Budget ($)</Form.Label>
                    <Row>
                        <Col>
                            <Input type="number" value={lowestBudget} onChange={setLowestBudget} min={0} placeholder="From" required={true} />
                        </Col>
                        <Col>
                            <Input type="number" value={highestBudget} onChange={setHighestBudget} min={highestBudgetDefault} placeholder="To" required={true} />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Completion time</Form.Label>
                    <Input type="text" value={completionTime} onChange={setCompletionTime} placeholder="E.g. 3 weeks to 1 month" required={true} />
                </Form.Group>

                <Form.Group className="mt-3 mb-0">
                    { (!validated && validated !== null) && <label className="text-danger">One or more fields are not filled correctly.</label> }
                    <AppButton type="submit" classes={[styles.SubmitBtn]} onClick={submitHandler}>Add Project</AppButton>
                </Form.Group>
            </Form>
        </AppModal>
    );
};

export default CreateUpdateProjectModal;
