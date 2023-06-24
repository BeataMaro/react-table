import { useState } from 'react';
import { styled } from 'styled-components';
import { IPhoto } from '../../models/photo.model';

const StyledUserPortfolio = styled.article`
  display: flex;
  flex-wrap: wrap;
  img {
    width: 30rem;
    border-radius: 2%;
  }
`;

export default function UserPortfolio({ portfolio }: { portfolio: IPhoto[] }) {
  return (
    <section>
      <StyledUserPortfolio>
        {portfolio.length && (
          <>
            <h4>Other images by this author</h4>
            <section>
              {portfolio?.map((photo) => (
                <img src={photo.urls?.regular} alt={photo.alt_description} key={photo.id} />
              ))}
            </section>
          </>
        )}
      </StyledUserPortfolio>
    </section>
  );
}
