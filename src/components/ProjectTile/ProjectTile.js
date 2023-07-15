import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './ProjectTile.module.scss';
import AppButton from "../AppButton/AppButton";

const ProjectTile = ({ id, project, onEdit, onDelete }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageAvailable, setImageAvailable] = useState(true);
    const allowedDescLength = 100;
    const desc = project.desc.length > allowedDescLength ? `${project.desc.substring(0, allowedDescLength)}...` : project.desc;

    return (
        <div className={styles.Wrapper}>
            <Row noGutters className={styles.Row}>
                <Col md={4}>
                    <div className={styles.PreviewContainer}>
                        { project.previewDownloadUrl && (
                            <img src={project.previewDownloadUrl}
                                 onLoad={() => setImageLoaded(true)}
                                 onError={() => setImageAvailable(false)}
                                 className={[styles.Preview, !imageLoaded ? styles.Hide : ''].join(' ')}
                                 alt="Preview" />
                        ) }

                        { !imageAvailable && <p className={styles.NotAvailableText}>No Preview available</p> }

                        { (imageAvailable && !imageLoaded) && <div className={styles.Spinner}><Spinner animation="grow" /></div> }
                    </div>
                </Col>

                <Col md={7}>
                    <div className={styles.ContentContainer}>
                        <div>
                            <h5 className={styles.Title}>{ project.title }</h5>
                            <p className={styles.Desc}>{ desc }</p>
                        </div>

                        <Row noGutters className={styles.BudgetTimeContainer}>
                            <Col>
                                <p className={styles.Key}>Budget</p>
                                <p className={styles.Value}>{ project.budget }</p>
                            </Col>
                            <Col>
                                <p className={styles.Key}>Completion time</p>
                                <p className={styles.Value}>{ project.completionTime }</p>
                            </Col>
                        </Row>
                    </div>
                </Col>

                <Col md={1}>
                    <div className={styles.ActionContainer}>
                        <AppButton variant="link" onClick={() => onEdit(id, project)} classes={[styles.ActionBtn]}>
                            <FontAwesomeIcon icon={faPencilAlt} /> <span>Edit</span>
                        </AppButton>
                        <AppButton variant="link" onClick={() => onDelete(id)} classes={[styles.ActionBtn]}>
                            <FontAwesomeIcon icon={faTrash} /> <span>Delete</span>
                        </AppButton>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ProjectTile;
