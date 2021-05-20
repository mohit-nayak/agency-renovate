import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import styles from './ProjectTile.module.scss';

const ProjectTile = ({ project }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageAvailble, setImageAvailable] = useState(true);
    const allowedDescLength = 120;
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

                        { !imageAvailble && <p className={styles.NotAvailableText}>No Preview available</p> }

                        { (imageAvailble && !imageLoaded) && <Spinner animation="grow" className={styles.Spinner} /> }
                    </div>
                </Col>
                <Col md={8}>
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
            </Row>
        </div>
    );
};

export default ProjectTile;
