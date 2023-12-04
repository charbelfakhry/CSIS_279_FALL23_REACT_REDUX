import { useGetUsersQuery } from '../redux/services/userSlice';
import { setAuth } from '../redux/store/authSlice';
import { useAppDispatch, useAppSelector } from '../store';

const Test = () => {

  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.auth.user?.username);

  const {
    data: users, 
    isLoading
  } = useGetUsersQuery();

  interface User {
    id: number,
    username: string
  };

  const user : User = {
    id: 1,
    username: 'X'
  }

  console.log(users);
  
  if (isLoading) {
    return <p>Loading...</p>
  }
  return (
    <>
      <button onClick={() => dispatch(setAuth({isAuthenticated: true, user}))}>
        Set User
      </button>
      <p>{username}</p>
    </>

  )
}

export default Test