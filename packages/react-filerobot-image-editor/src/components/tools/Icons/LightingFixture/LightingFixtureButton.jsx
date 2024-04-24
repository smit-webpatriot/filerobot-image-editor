/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { ImageOutline as ImageIcon } from '@scaleflex/icons/image-outline';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const LightingFixtureButton = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    className="FIE_image-tool-button"
    id={TOOLS_IDS.LIGHTING_FIXTURE}
    label={t('imageTool')}
    Icon={ImageIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

LightingFixtureButton.defaultProps = {
  isSelected: false,
};

LightingFixtureButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default LightingFixtureButton;
