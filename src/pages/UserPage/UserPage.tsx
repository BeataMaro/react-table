import { useEffect, useState } from 'react';
import UserInfo from '../../components/UserInfo/UserInfo';

export default function UserPage() {
  const [username, setUsername] = useState('');

  let url = location.pathname;

  useEffect(() => {
    async function getUsername() {
      let user = await url.substring(1);
      await console.log(user);
      await setUsername(user);
    }
    getUsername();
  }, []);

  return (
    <>
      <UserInfo username={username} details={true} />
    </>
  );
}
