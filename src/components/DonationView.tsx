import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
interface Donation {
  donorName: string;
  amount: number;
  message: string;
}
function DonationViewComponent({apiUrl}: {apiUrl: string}) {
  const { data: donations } = useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/api/donation/getall?page=1&limit=10`);
      const { data } = await response.json();
      return data as Donation[];
    },
  });
  return <div className="flex flex-col gap-4 justify-center items-center">{donations?.map((donation: Donation, index: number) => <DonationCard key={index} {...donation} />)}</div>;
}

function DonationCard({ donorName, amount, message }: { donorName: string; amount: number; message: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-xl w-full">
      <blockquote className="relative">
        <p className="text-lg text-gray-800 italic leading-relaxed mb-4">
          "{message}"
        </p>
        <footer className="mt-2">
          <cite className="flex flex-col not-italic">
            <span className="text-gray-700 font-medium">— {donorName}</span>
            <span className="text-sm text-gray-500 mt-1">
              Baru saja menyumbang Rp {amount.toLocaleString('id-ID')}
            </span>
          </cite>
        </footer>
      </blockquote>
    </div>
  );
}

export default function DonationView({apiUrl}: {apiUrl: string}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <DonationViewComponent apiUrl={apiUrl} />
    </QueryClientProvider>
  );
}
