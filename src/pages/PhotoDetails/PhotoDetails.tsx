import { useNavigate } from 'react-router-dom';

export default function PhotoDetails() {
  const navigate = useNavigate();
  return (
    <section>
      PhotoDetails
      <button onClick={() => navigate(-1)}>Back</button>
    </section>
  );
}
