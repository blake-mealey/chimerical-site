import React from "react";
import styled from "styled-components";
import Card from "./Card";

const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CardList = ({ items }) => {
  console.log('before', items);
  items = items.sort((a, b) => a.compare(b));
  console.log('after', items);

  return <StyledList>
    {items.map(cardDetails => (
      <Card id={cardDetails.id}
            title={cardDetails.title}
            tags={cardDetails.tags}
            dates={cardDetails.dates}
            links={cardDetails.links}>
        <div dangerouslySetInnerHTML={{ __html: cardDetails.description }}></div>
      </Card>
    ))}
  </StyledList>;
};

export default CardList;