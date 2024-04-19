import React from 'react';
type Props={
  title:string;
}
const SubscriptionCard: React.FC<Props> = props => {
  const {title}=props
  return (
    <>
    <h3>{title}</h3>
      <li>dfsdf</li>
      <li>dfsdf</li>
    </>
  );
};

export default SubscriptionCard;
