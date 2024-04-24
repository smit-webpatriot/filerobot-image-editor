/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useAnnotation, useStore } from 'hooks';
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';
import CanIcon from './CanIcon';
import can from './can.svg';
import canPng from './can.png';

const ADDED_IMG_SPACING_PERCENT = 0.15;

const CanButton = ({ isSelected, t }) => {
  const {
    shownImageDimensions,
    adjustments: { crop = {} },
  } = useStore();

  const [image, saveImage, addNewImage] = useAnnotation(
    {
      name: TOOLS_IDS.IMAGE,
      opacity: 1,
    },
    false,
  );

  const addImgScaled = (loadedImg) => {
    const layerWidth = crop.width || shownImageDimensions.width;
    const layerHeight = crop.height || shownImageDimensions.height;
    const layerCropX = crop.x || 0;
    const layerCropY = crop.y || 0;

    const newImgRatio = Math.min(
      1,
      layerWidth /
        (loadedImg.width + loadedImg.width * ADDED_IMG_SPACING_PERCENT),
      layerHeight /
        (loadedImg.height + loadedImg.height * ADDED_IMG_SPACING_PERCENT),
    );

    addNewImage({
      image: loadedImg,
      x: layerCropX + layerWidth / 2 - (loadedImg.width * newImgRatio) / 2,
      y: layerCropY + layerHeight / 2 - (loadedImg.height * newImgRatio) / 2,
      width: loadedImg.width * newImgRatio,
      height: loadedImg.height * newImgRatio,
    });
  };

  const handleClick = () => {
    fetch(canPng)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const img = new Image();

        img.onload = () => {
          addImgScaled(img);
          URL.revokeObjectURL(blobUrl);
        };

        img.src = blobUrl;
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
      });
    // const img = new Image();
    // img.onload = () => {
    //   addImgScaled(img);
    // };
    // console.log(canPng);
    // img.src = URL.createObjectURL(canPng);
  };

  return (
    <ToolsBarItemButton
      className="FIE_image-tool-button"
      id={TOOLS_IDS.CAN}
      label={t('imageTool')}
      Icon={CanIcon}
      onClick={handleClick}
      isSelected={isSelected}
    />
  );
};

CanButton.defaultProps = {
  isSelected: false,
};

CanButton.propTypes = {
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default CanButton;
