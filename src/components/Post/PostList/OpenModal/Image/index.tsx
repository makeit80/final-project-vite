import react from 'react';
import St from './style';
import Slider from 'react-slick';
import './slick-theme.css';
import './slick.css';

const ModalImage = ({modalData}: any) => {
  // option
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <>
      {modalData.photo_url.length > 1 ? (
        <Slider {...settings}>
          {modalData.photo_url &&
            modalData.photo_url.map((url, index) => {
              return <St.SliderImg key={index} src={url} />;
            })}
        </Slider>
      ) : (
        <St.OneImageDiv>
          {modalData.photo_url &&
            modalData.photo_url.map((url, index) => {
              return <St.OneImage key={index} src={url} />;
            })}
        </St.OneImageDiv>
      )}
    </>
  );
};

export default ModalImage;
