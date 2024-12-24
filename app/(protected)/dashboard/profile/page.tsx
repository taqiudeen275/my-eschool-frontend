// app/(protected)/profile/page.js
import { getAccessToken, fetchProtectedData } from '@/lib/auth';

export default async function ProfilePage() {
  const accessToken = await getAccessToken();

  // Example: Fetch protected data using the access token
  let protectedData = null;
  if (accessToken) {
    protectedData = await fetchProtectedData(accessToken, "users/users/");
  }

  return (
    <div>
      <h1>Profile (Protected)</h1>
      {protectedData ? (
        <div>
          {/* Display the protected data */}
          <pre>{JSON.stringify(protectedData, null, 2)}</pre>
        </div>
      ) : (
        <p>Unable to fetch protected data.</p>
      )}
    </div>
  );
}