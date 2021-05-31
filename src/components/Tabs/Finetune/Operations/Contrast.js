import React from 'react';

import { FintuneOperationWrapper } from './Operations.styled';

const Contrast = () => {
  return (
    <FintuneOperationWrapper>
      <input type="range" min="1" max="100" value="50" />
    </FintuneOperationWrapper>
  );
}

export default Contrast;