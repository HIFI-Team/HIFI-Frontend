import React from 'react';
import styled from 'styled-components';

const ProfileDto = ({ profile }) => {
  const { name, description, image, anonymous } = profile;

  return (
    <>
      <h2>이름 : {name}</h2>
      소개 : {description}
      비공개 여부 : {anonymous}
    </>
  );
};
