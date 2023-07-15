import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from './ImageSlider.module.scss';
import './ImageSliderOverwrite.css';

const ImageSlider = ({ images }) => {
    return (
        <div className={styles.Wrapper}>
            { images && (
                <Carousel showThumbs={false} infiniteLoop={true}>
                    { images.map((image, index) => {
                        return (
                            <div key={index}>
                                <img src={image} alt="" className={styles.Image} />
                            </div>
                        )
                    })}
                </Carousel>
            )}
        </div>
    );
};

export default ImageSlider;
