'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Button, Input, Spacer, Card,  } from '@nextui-org/react';

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmit, setIssubmit] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard/profile';

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIssubmit(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      setIssubmit(false);
      if (response.ok) {
        setSuccess('Login successful ' );
        router.push(callbackUrl); // Redirect to the original protected page or home
      } else {
        const data = await response.json();
        setPassword("")

        setError(data.message == 'Login failed'? 'Invalid email or password': data.message);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setPassword("")
     
      setError('An error occurred during login: ');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen px-4" >
      <Card className="p-6 w-full max-w-md">
        <h1 className='  font-extrabold mb-4 text-2xl'>
          Welcome back login to continue
        </h1>
        {error && (
          <p className='text-danger mb-4'>
            {error}
          </p>
        )}
        {success && (
          <p className='text-success mb-4'>
            {success}
          </p>
        )}
        <form onSubmit={handleSubmit} className=''>
          <Input
            fullWidth
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Spacer y={1.5} />
          <Input
            fullWidth
            type='password'
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Spacer y={1.5} />
          <Button type="submit" color='primary' disabled={isSubmit} isLoading={isSubmit} fullWidth spinner={
        <svg
          className="animate-spin h-5 w-5 text-current"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
          />
        </svg>
      }>
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}
