'use client'

import { useState, useEffect } from 'react';
import { Input, Button,  } from '@nextui-org/react';
import { User } from '@/lib/types';
import { fetchUser, createUser, updateUser } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'

interface UserFormProps {
  userId?: number;
}

const UserForm: React.FC<UserFormProps> = ({ userId }) => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/users'

  const [user, setUser] = useState<User>({
    id: 0,
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    roles: [],
    password: ''
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (!userId) return;

      try {
        const fetchedUser = await fetchUser(userId);
        setUser(fetchedUser);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    };

    getUser();
  }, [userId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (userId) {
        await updateUser(userId, user);
      } else {
        await createUser(user);
      }
      router.push(callbackUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <h2>{userId ? 'Edit User' : 'Create User'}</h2>
      {error && <p>Error: {error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type="text"
            label="Username"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            isRequired
          />
        </div>
        <div>
          <Input
            type="email"
            label="Email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            isRequired
          />
        </div>
        {/* Add other input fields (first_name, last_name, etc.) */}
        <div>
          <Input
            type="password"
            label="Password"
            name="password"
            value={user.password || ''}
            onChange={handleInputChange}
            isRequired={!userId} // Password required only for new users
          />
        </div>

        <Button type="submit" color="primary" isLoading={loading}>
          {userId ? 'Save Changes' : 'Create User'}
        </Button>
      </form>
    </div>
  );
};

export default UserForm;