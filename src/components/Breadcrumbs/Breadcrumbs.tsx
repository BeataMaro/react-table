import { Link } from 'react-router-dom';
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';
import { styled } from 'styled-components';

const StyledBreadcrumbs = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 1rem 0 0 1rem;

  & li {
    & a span {
      color: grey;
    }
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Breadcrumbs() {
  const breadcrumbs = useReactRouterBreadcrumbs();

  return (
    <nav>
      <StyledBreadcrumbs>
        {breadcrumbs.map(({ match, breadcrumb }, idx) => (
          <li key={idx}>
            <Link to={match}>{breadcrumb} /</Link>
          </li>
        ))}
      </StyledBreadcrumbs>
    </nav>
  );
}
