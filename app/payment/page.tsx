"use client"
import { useSearchParams } from 'next/navigation';

export default function PaymentPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get('name') || '';
  const phone = searchParams.get('phone') || '';
  const email = searchParams.get('email') || '';
  const area = searchParams.get('area') || '';
  const custom_area = searchParams.get('custom_area') || '';
  const has_license = searchParams.get('has_license') === 'true';

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
      <div className="space-y-3">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Area:</strong> {area}</p>
        {custom_area && (
          <p><strong>Custom Area:</strong> {custom_area}</p>
        )}
        <p><strong>Has License:</strong> {has_license ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}