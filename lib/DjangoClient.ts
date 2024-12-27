import { useUser, auth, apiClient } from './apiClient';

// Authentication
const loginUser = async () => {
  try {
    const response = await auth.login('user@example.com', 'password');
    console.log('Logged in user:', response.user);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Using SWR hooks
function UserProfile() {
  const { data: user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;
  
  return <div>Welcome, {user?.username}!</div>;
}

// Direct API calls
const createResource = async () => {
  try {
    const result = await apiClient.post('/resources/', {
      name: 'New Resource',
    });
    console.log('Created:', result);
  } catch (error) {
    console.error('Failed to create resource:', error);
  }
};