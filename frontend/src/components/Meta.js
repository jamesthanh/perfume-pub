import React from 'react';
import { Helmet } from 'react-helmet';
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='desciption' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Chào mừng đến tới PerfumePub | Trang chủ',
  description: 'Shop chuyên bán nước hoa nhập khẩu giá rẻ',
  keywords: 'nước hoa, hàng ngoại nhập, giá rẻ',
};

export default Meta;
