import React, {useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import AppButton from "../AppButton/AppButton";
import SendEmail from "../SendEmail/SendEmail";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faShareSquare} from "@fortawesome/free-solid-svg-icons";
import styles from './QuoteTile.module.scss';
import ImageSlider from "../ImageSlider/ImageSlider";

const QuoteTile = ({ data }) => {
    const [userDetailsVisible, setUserDetailsVisible] = useState(false);
    // const [showFullDesc, setShowFullDesc] = useState(null);
    const [showEmailShare, setShowEmailShare] = useState(false);

    const {
        id,
        title,
        desc,
        location,
        budget,
        user,
        photos,
        propertyType,
        renovationTime,
        renovationPropertyFor,
        renovationPropertyType,
    } = data;

    // const descLimit = 200;

    /*useEffect(() => {
        if (desc.length > descLimit) {
            setShowFullDesc(false);
        }
    }, [desc]);*/

    return (
        <div className={styles.Wrapper}>
            <Row noGutters className={styles.Row}>
                <Col lg={5} className={styles.SliderContainer}>
                    <ImageSlider images={photos} />
                </Col>
                <Col lg={7}>
                    <div className={styles.ContentContainer}>
                        <div>
                            <div className={styles.TitleContainer}>
                                <div>
                                    <h5 className={styles.Title}>{ title }</h5>
                                </div>
                                <p className={styles.ID}><span>Quote ID</span> #{id}</p>
                            </div>

                            <div className={styles.UserProfileContainer}>
                                <p className={styles.Username} onClick={() => setUserDetailsVisible(!userDetailsVisible)}>
                                    <span className='mr-2'>By {user.name}</span>
                                    { !userDetailsVisible && <FontAwesomeIcon icon={faChevronDown} /> }
                                    { userDetailsVisible && <FontAwesomeIcon icon={faChevronUp} /> }
                                </p>

                                { userDetailsVisible && <div>
                                    <p className={styles.UserDetail}>Contact: <span className="text-primary">{user.contact}</span></p>
                                    <p className={styles.UserDetail}>Email: <span className="text-primary">{user.email}</span></p>
                                    <p className={styles.UserDetail}>Preferred contact method: <span className="text-primary">{user.preferredContactMethod}</span></p>
                                </div>}
                            </div>

                            <p className={styles.Desc}>
                                { desc }
                                {/*{ !showFullDesc ? desc.substring(0, descLimit).concat('... ') : desc.concat(' ') }
                                { (!showFullDesc && showFullDesc !== null) && (
                                    <span className={styles.DescToggle} onClick={() => setShowFullDesc(!showFullDesc)}>view more</span>
                                )}
                                { (showFullDesc) && (
                                    <span className={styles.DescToggle} onClick={() => setShowFullDesc(!showFullDesc)}>view less</span>
                                )}*/}
                            </p>
                        </div>

                        <Row noGutters className={styles.BudgetTimeContainer}>
                            <Col xs={12} sm={6} className="mb-2">
                                <p className={styles.Key}>Budget</p>
                                <p className={styles.Value}>{ budget }</p>
                            </Col>
                            <Col xs={12} sm={6} className="d-flex justify-content-between align-items-end mb-2">
                                <div>
                                    <p className={styles.Key}>Location</p>
                                    <p className={styles.Value}>{ location }</p>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} className="mb-2">
                                <p className={styles.Key}>Property type</p>
                                <p className={styles.Value}>{ propertyType }</p>
                            </Col>
                            <Col xs={12} sm={6} className="d-flex justify-content-between align-items-end mb-2">
                                <div>
                                    <p className={styles.Key}>Renovation time</p>
                                    <p className={styles.Value}>{ renovationTime }</p>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} className="mb-2 mb-sm-0">
                                <p className={styles.Key}>Renovation property type</p>
                                <p className={styles.Value}>{ renovationPropertyType }</p>
                            </Col>
                            <Col xs={12} sm={6} className="d-flex justify-content-between align-items-end">
                                <div>
                                    <p className={styles.Key}>Renovation property for</p>
                                    <p className={styles.Value}>{ renovationPropertyFor }</p>
                                </div>

                                <p className={styles.SendEmailLink} onClick={() => setShowEmailShare(true)}>
                                    <FontAwesomeIcon icon={faShareSquare} />
                                </p>
                            </Col>
                        </Row>

                        { showEmailShare && <SendEmail data={data} onHide={() => setShowEmailShare(false)} /> }
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default QuoteTile;
