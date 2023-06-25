import { styled } from 'styled-components';
import { IPhoto } from '../../models/photo.model';

const StyledUserPortfolio = styled.article`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin-top: 1rem;

  img {
    width: 30rem;
    border-radius: 2%;
  }
`;

export default function UserPortfolio({ portfolio }: { portfolio: IPhoto[] }) {
  return (
    <section>
      {portfolio.length && (
        <>
          <h4>Other images by this author</h4>
          <StyledUserPortfolio>
            {portfolio?.map((photo) => (
              <img src={photo.urls?.small} alt={photo.alt_description} key={photo.id} />
            ))}
          </StyledUserPortfolio>
        </>
      )}
    </section>
  );
}
